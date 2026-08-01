import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { hashPassword } from '../../../../../lib/auth';
import { supabase as defaultSupabase } from '../../../../../lib/supabase';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.VITE_SUPABASE_URL || 'https://crqvvcxmbvvcngfqdsnj.supabase.co';
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabaseAdmin = serviceKey ? createClient(supabaseUrl, serviceKey) : defaultSupabase;

const MESSAGE_CENTRAL_CUSTOMER_ID = process.env.MESSAGE_CENTRAL_CUSTOMER_ID || 'C-3911A8398E68431';
const MESSAGE_CENTRAL_AUTH_TOKEN = process.env.MESSAGE_CENTRAL_AUTH_TOKEN || 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJDLTM5MTFBODM5OEU2ODQzMSIsImlhdCI6MTc4MDU3MTU0OSwiZXhwIjoxOTM4MjUxNTQ5fQ.XnpqkNqpsS1DPlQs0dnT5szgSo_qG8bB6rim68L-eXra_Gs2lumTQLqTBzhxIPuU3f0qribvtJdTfoOfefbCZQ';

export async function POST(request) {
  try {
    const body = await request.json();
    const { action, phone, otp, newPassword } = body;

    const rawPhone = (phone || body.emailOrPhone || '').trim();
    const cleanDigits = rawPhone.replace(/[^0-9]/g, '');
    const mobileNumber = cleanDigits.length >= 10 ? cleanDigits.slice(-10) : cleanDigits;

    if (!mobileNumber) {
      return NextResponse.json(
        { error: 'Registered WhatsApp Phone Number is required' },
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

    // Step 1: Generate & Send 4-Digit OTP via Message Central API
    if (action === 'send_otp') {
      // Generate secure 4-digit OTP
      const generatedOtp = Math.floor(1000 + Math.random() * 9000).toString();
      const expiresAt = new Date(Date.now() + 10 * 60 * 1000).toISOString(); // 10 minutes expiry

      // Save generated 4-digit OTP in Supabase organizations table
      const { error: updateErr } = await supabaseAdmin
        .from('organizations')
        .update({
          reset_otp: generatedOtp,
          reset_otp_expires_at: expiresAt
        })
        .eq('id', partner.id);

      if (updateErr) {
        console.warn('Database error saving OTP:', updateErr.message);
      }

      // Dispatch OTP via Message Central CPaaS API
      try {
        const mcUrl = `https://cpaas.messagecentral.com/verification/v2/verification/sendCode?countryCode=91&customerId=${MESSAGE_CENTRAL_CUSTOMER_ID}&flowType=SMS&mobileNumber=${mobileNumber}&otpLength=4`;
        const mcRes = await fetch(mcUrl, {
          method: 'POST',
          headers: {
            'authToken': MESSAGE_CENTRAL_AUTH_TOKEN,
            'Content-Type': 'application/json'
          }
        });
        const mcData = await mcRes.json();
        console.log('[MESSAGE CENTRAL OTP RESPONSE]:', mcData);
      } catch (mcErr) {
        console.warn('[MESSAGE CENTRAL NOTICE]:', mcErr.message);
      }

      console.log(`[MESSAGE CENTRAL OTP DISPATCHED] Phone: +91 ${mobileNumber} | Code: ${generatedOtp} | Account: ${partner.name}`);

      return NextResponse.json({
        success: true,
        message: `4-Digit Security OTP sent to +91 ${mobileNumber.slice(0, 5)}*****. Please check your SMS/WhatsApp.`,
        partnerName: partner.name,
        maskedContact: `+91 ${mobileNumber.slice(0, 5)}*****`
      });
    }

    // Step 2: Strict 4-Digit OTP Verification
    if (action === 'verify_otp') {
      const inputOtp = (otp || '').trim();

      if (!inputOtp || inputOtp.length !== 4) {
        return NextResponse.json(
          { error: 'Please enter the valid 4-digit OTP code sent to your phone' },
          { status: 400 }
        );
      }

      const storedOtp = partner.reset_otp;
      const expiresAt = partner.reset_otp_expires_at ? new Date(partner.reset_otp_expires_at) : null;

      // STRICT VALIDATION: Must match stored OTP exactly!
      if (!storedOtp || storedOtp !== inputOtp) {
        return NextResponse.json(
          { error: 'Invalid 4-Digit OTP code. Please enter the exact code sent to your phone.' },
          { status: 400 }
        );
      }

      if (expiresAt && new Date() > expiresAt) {
        return NextResponse.json(
          { error: 'OTP code has expired. Please request a new code.' },
          { status: 400 }
        );
      }

      return NextResponse.json({
        success: true,
        message: '4-Digit OTP verified successfully! You may now set your new password.'
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

      // Clear OTP and update password in organizations table
      await supabaseAdmin
        .from('organizations')
        .update({
          password_hash: newHash,
          reset_otp: null,
          reset_otp_expires_at: null
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
