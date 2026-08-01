import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { verifyPassword, createPartnerToken } from '../../../../../lib/auth';
import { supabase as defaultSupabase } from '../../../../../lib/supabase';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.VITE_SUPABASE_URL || 'https://crqvvcxmbvvcngfqdsnj.supabase.co';
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabaseAdmin = serviceKey ? createClient(supabaseUrl, serviceKey) : defaultSupabase;

export async function POST(request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    const identifier = (email || '').trim().toLowerCase();

    if (!identifier || !password) {
      return NextResponse.json(
        { error: 'Email/Phone and Password are required' },
        { status: 400 }
      );
    }

    // Query organizations table by email or contact_number or unique_code
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

    // Verify password if hash exists
    if (partner.password_hash) {
      const isValid = verifyPassword(password, partner.password_hash);
      if (!isValid) {
        return NextResponse.json(
          { error: 'Invalid password. Please check your credentials.' },
          { status: 401 }
        );
      }
    } else {
      // If password_hash wasn't set during initial creation, set it now
      const hashPassword = require('../../../../../lib/auth').hashPassword;
      const newHash = hashPassword(password);
      await supabaseAdmin
        .from('organizations')
        .update({ email: identifier, password_hash: newHash })
        .eq('id', partner.id);
      partner.password_hash = newHash;
    }

    const token = createPartnerToken(partner.email || identifier, partner.unique_code);

    return NextResponse.json({
      success: true,
      token,
      partner: {
        id: partner.id,
        name: partner.name,
        contact_number: partner.contact_number,
        email: partner.email || identifier,
        unique_code: partner.unique_code,
        total_rewards: partner.total_rewards || 0,
        total_referred_users: partner.total_referred_users || 0,
        active_workers_count: partner.active_workers_count || 0,
        total_works_completed: partner.total_works_completed || 0
      }
    });
  } catch (error) {
    console.error('Partner login error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error', details: error.message },
      { status: 500 }
    );
  }
}
