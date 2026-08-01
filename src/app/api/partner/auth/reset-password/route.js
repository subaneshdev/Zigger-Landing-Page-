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
    const { action, emailOrPhone, newPassword } = body;

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

    // Step 1: Verify Account exists
    if (action === 'verify') {
      return NextResponse.json({
        success: true,
        message: `Account verified for ${partner.name}. You may now reset your password.`,
        partnerName: partner.name,
        contact: partner.contact_number
      });
    }

    // Step 2: Reset Password
    if (action === 'reset') {
      if (!newPassword || newPassword.length < 6) {
        return NextResponse.json(
          { error: 'Password must be at least 6 characters long' },
          { status: 400 }
        );
      }

      const newHash = hashPassword(newPassword);

      const { error: updateErr } = await supabaseAdmin
        .from('organizations')
        .update({ password_hash: newHash })
        .eq('id', partner.id);

      if (updateErr) {
        return NextResponse.json(
          { error: `Failed to update password: ${updateErr.message}` },
          { status: 500 }
        );
      }

      return NextResponse.json({
        success: true,
        message: 'Password reset successfully! You can now sign in with your new password.'
      });
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (error) {
    console.error('Password reset error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error', details: error.message },
      { status: 500 }
    );
  }
}
