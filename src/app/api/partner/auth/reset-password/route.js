import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { hashPassword } from '../../../../../lib/auth';
import { supabase as defaultSupabase } from '../../../../../lib/supabase';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.VITE_SUPABASE_URL || 'https://crqvvcxmbvvcngfqdsnj.supabase.co';
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabaseAdmin = serviceKey ? createClient(supabaseUrl, serviceKey) : defaultSupabase;

const MESSAGE_CENTRAL_AUTH_TOKEN = process.env.MESSAGE_CENTRAL_AUTH_TOKEN || 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJDLTM5MTFBODM5OEU2ODQzMSIsImlhdCI6MTc4MDU3MTU0OSwiZXhwIjoxOTM4MjUxNTQ5fQ.XnpqkNqpsS1DPlQs0dnT5szgSo_qG8bB6rim68L-eXra_Gs2lumTQLqTBzhxIPuU3f0qribvtJdTfoOfefbCZQ';

// Session store mapping mobileNumber -> verificationId from MessageCentral v3
const mcVerificationStore = new Map();

export async function POST(request) {
  try {
    const body = await request.json();
    const { action, phone, otp, newPassword } = body;

    const rawPhone = (phone || body.emailOrPhone || '').trim();
    const cleanDigits = rawPhone.replace(/[^0-9]/g, '');
    const mobileNumber = cleanDigits.length >= 10 ? cleanDigits.slice(-10) : cleanDigits;

    if (!mobileNumber) {
      return NextResponse.json(
        { error: 'Registered WhatsApp/Mobile Phone Number is required' },
        { status: 400 }
      );
    }

    // Find organization by contact_number
    const { data: partner, error } = await supabaseAdmin
      .from('organizations')
      .select('*')
      .ilike('contact_number', `%${mobileNumber}%`)
      .maybeSingle();

    if (error || !partner) {
      return NextResponse.json(
        { error: `No Community Partner account found with mobile number ${mobileNumber}` },
        { status: 404 }
      );
    }

    // Step 1: Send 4-Digit SMS OTP via MessageCentral v3 API
    if (action === 'send_otp') {
      const mcUrl = `https://cpaas.messagecentral.com/verification/v3/send?countryCode=91&flowType=SMS&mobileNumber=${mobileNumber}&otpLength=4`;
      
      let verificationId = null;
      let sendSuccess = false;
      let apiErrorMsg = null;

      try {
        const mcRes = await fetch(mcUrl, {
          method: 'POST',
          headers: {
            'authToken': MESSAGE_CENTRAL_AUTH_TOKEN
          }
        });

        const mcData = await mcRes.json();
        console.log('[MESSAGECENTRAL V3 SEND SUCCESS]:', mcData);

        if (mcData && mcData.responseCode === 200 && mcData.data && mcData.data.verificationId) {
          verificationId = mcData.data.verificationId;
          sendSuccess = true;
          mcVerificationStore.set(mobileNumber, verificationId);
        } else {
          apiErrorMsg = mcData?.message || 'Failed to dispatch SMS via MessageCentral';
        }
      } catch (mcErr) {
        console.error('[MESSAGECENTRAL V3 ERROR]:', mcErr.message);
        apiErrorMsg = mcErr.message;
      }

      if (!sendSuccess) {
        return NextResponse.json(
          { error: `MessageCentral SMS dispatch notice: ${apiErrorMsg || 'SMS delivery failed. Please check phone number.'}` },
          { status: 500 }
        );
      }

      return NextResponse.json({
        success: true,
        message: `4-Digit Security OTP sent via SMS to +91 ${mobileNumber.slice(0, 5)}*****. Please check your phone SMS messages!`,
        partnerName: partner.name,
        maskedContact: `+91 ${mobileNumber.slice(0, 5)}*****`,
        verificationId: verificationId
      });
    }

    // Step 2: Validate 4-Digit OTP via MessageCentral v3 API
    if (action === 'verify_otp') {
      const inputOtp = (otp || '').trim();

      if (!inputOtp || inputOtp.length !== 4) {
        return NextResponse.json(
          { error: 'Please enter the exact 4-digit OTP code sent to your phone messages' },
          { status: 400 }
        );
      }

      const storedVerificationId = mcVerificationStore.get(mobileNumber);

      if (!storedVerificationId) {
        return NextResponse.json(
          { error: 'Verification session expired. Please click Resend OTP.' },
          { status: 400 }
        );
      }

      // Call MessageCentral v3 Validate OTP API
      const validateUrl = `https://cpaas.messagecentral.com/verification/v3/validateOtp?verificationId=${storedVerificationId}&code=${inputOtp}`;
      
      let isVerified = false;
      let validateError = null;

      try {
        const valRes = await fetch(validateUrl, {
          method: 'POST',
          headers: {
            'authToken': MESSAGE_CENTRAL_AUTH_TOKEN
          }
        });

        const valData = await valRes.json();
        console.log('[MESSAGECENTRAL V3 VALIDATE RESPONSE]:', valData);

        if (valData && valData.responseCode === 200 && valData.data && valData.data.verificationStatus === 'VERIFICATION_COMPLETED') {
          isVerified = true;
        } else {
          validateError = valData?.message || (valData?.data ? valData.data.errorMessage : null) || 'Invalid OTP code';
        }
      } catch (err) {
        console.error('[MESSAGECENTRAL VALIDATE ERROR]:', err.message);
        validateError = err.message;
      }

      if (!isVerified) {
        return NextResponse.json(
          { error: `Invalid 4-Digit OTP code. ${validateError || 'Please check your phone SMS messages and enter the exact code.'}` },
          { status: 400 }
        );
      }

      return NextResponse.json({
        success: true,
        message: '4-Digit MessageCentral OTP verified successfully! You may now set your new password.'
      });
    }

    // Step 3: Reset Password
    if (action === 'reset_password') {
      if (!newPassword || newPassword.length < 6) {
        return NextResponse.json(
          { error: 'Password must be at least 6 characters long' },
          { status: 400 }
        );
      }

      const newHash = hashPassword(newPassword);

      // Update password in Supabase Auth if partner has email
      if (partner.email) {
        try {
          const { data: users } = await supabaseAdmin.auth.admin.listUsers();
          const authUser = users?.users?.find(u => u.email === partner.email);
          if (authUser) {
            await supabaseAdmin.auth.admin.updateUserById(authUser.id, {
              password: newPassword
            });
          }
        } catch (authErr) {
          console.warn('Supabase Auth update notice:', authErr.message);
        }
      }

      // Clear verification session
      mcVerificationStore.delete(mobileNumber);

      // Save new password hash in organizations table
      await supabaseAdmin
        .from('organizations')
        .update({
          password_hash: newHash
        })
        .eq('id', partner.id);

      return NextResponse.json({
        success: true,
        message: 'Password updated successfully! You can now sign in with your new password.'
      });
    }

    return NextResponse.json({ error: 'Invalid action parameter' }, { status: 400 });
  } catch (error) {
    console.error('Password reset error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error', details: error.message },
      { status: 500 }
    );
  }
}
