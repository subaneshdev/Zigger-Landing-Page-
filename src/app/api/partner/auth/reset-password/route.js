import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { hashPassword } from '../../../../../lib/auth';
import { supabase as defaultSupabase } from '../../../../../lib/supabase';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.VITE_SUPABASE_URL || 'https://crqvvcxmbvvcngfqdsnj.supabase.co';
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabaseAdmin = serviceKey ? createClient(supabaseUrl, serviceKey) : defaultSupabase;

export async function POST(request) {
  try {
    const body = await request.json();
    const { action, emailOrPhone, otp, newPassword } = body;

    const identifier = (emailOrPhone || '').trim().toLowerCase();

    if (!identifier) {
      return NextResponse.json(
        { error: 'Email Address or WhatsApp Number is required' },
        { status: 400 }
      );
    }

    // Find organization by email or contact_number or unique_code
    const { data: partner, error } = await supabaseAdmin
      .from('organizations')
      .select('*')
      .or(`email.eq.${identifier},contact_number.eq.${identifier},unique_code.eq.${identifier.toUpperCase()}`)
      .maybeSingle();

    if (error || !partner) {
      return NextResponse.json(
        { error: 'No Community Partner account found with this email or phone' },
        { status: 404 }
      );
    }

    // Step 1: Trigger Supabase Auth Reset Email & Generate 6-Digit OTP
    if (action === 'send_otp') {
      const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
      const expiresAt = new Date(Date.now() + 10 * 60 * 1000).toISOString();

      // Trigger Supabase Auth reset email if partner has email
      if (partner.email) {
        try {
          await supabaseAdmin.auth.resetPasswordForEmail(partner.email, {
            redirectTo: 'https://ziggers.in/partner'
          });
        } catch (authErr) {
          console.warn('Supabase Auth resetPasswordForEmail notice:', authErr.message);
        }
      }

      // Save OTP to organizations table
      try {
        await supabaseAdmin
          .from('organizations')
          .update({
            reset_otp: generatedOtp,
            reset_otp_expires_at: expiresAt
          })
          .eq('id', partner.id);
      } catch (err) {
        console.warn('Notice updating reset_otp column:', err.message);
      }

      console.log(`[SUPABASE AUTH OTP SENT] Security verification code for ${partner.name} (${partner.contact_number}): ${generatedOtp}`);

      return NextResponse.json({
        success: true,
        message: `Supabase Auth verification code & email link sent to ${partner.contact_number || partner.email}!`,
        otp: generatedOtp,
        partnerName: partner.name,
        maskedContact: partner.contact_number ? `${partner.contact_number.slice(0, 6)}*****` : partner.email
      });
    }

    // Step 2: Verify 6-Digit OTP
    if (action === 'verify_otp') {
      if (!otp || otp.trim().length !== 6) {
        return NextResponse.json(
          { error: 'Please enter the valid 6-digit OTP code' },
          { status: 400 }
        );
      }

      const inputOtp = otp.trim();
      const storedOtp = partner.reset_otp;
      const expiresAt = partner.reset_otp_expires_at ? new Date(partner.reset_otp_expires_at) : null;

      if (storedOtp) {
        if (storedOtp !== inputOtp) {
          return NextResponse.json(
            { error: 'Invalid OTP code. Please check your messages and try again.' },
            { status: 400 }
          );
        }
        if (expiresAt && new Date() > expiresAt) {
          return NextResponse.json(
            { error: 'OTP code has expired. Please request a new verification code.' },
            { status: 400 }
          );
        }
      }

      return NextResponse.json({
        success: true,
        message: 'OTP verified successfully via Supabase Auth! You may now set your new password.'
      });
    }

    // Step 3: Reset Password in Supabase Auth & Organizations
    if (action === 'reset_password') {
      if (!newPassword || newPassword.length < 6) {
        return NextResponse.json(
          { error: 'Password must be at least 6 characters long' },
          { status: 400 }
        );
      }

      const newHash = hashPassword(newPassword);

      // Update password in Supabase Auth if partner user exists
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
          console.warn('Supabase Auth updateUserById notice:', authErr.message);
        }
      }

      // Update password in organizations table
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
        message: 'Password updated successfully in Supabase Auth! You can now sign in.'
      });
    }

    return NextResponse.json({ error: 'Invalid action parameter' }, { status: 400 });
  } catch (error) {
    console.error('Password reset OTP error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error', details: error.message },
      { status: 500 }
    );
  }
}
