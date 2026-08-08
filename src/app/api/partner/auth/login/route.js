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

    // 1. Attempt Supabase Auth Sign-In
    let supabaseAuthSession = null;
    try {
      const { data: authData, error: authErr } = await supabaseAdmin.auth.signInWithPassword({
        email: identifier,
        password: password
      });

      if (authData && authData.session) {
        supabaseAuthSession = authData.session;
      }
    } catch (err) {
      console.warn('Supabase Auth signIn notice:', err.message);
    }

    // 2. Query organizations table by email or contact_number or unique_code
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

    // 3. Verify password hash if not authenticated via Supabase Auth session
    if (!supabaseAuthSession && partner.password_hash) {
      const isValid = verifyPassword(password, partner.password_hash);
      if (!isValid) {
        return NextResponse.json(
          { error: 'Invalid password. Please check your credentials.' },
          { status: 401 }
        );
      }
    }

    const token = createPartnerToken(partner.email || identifier, partner.unique_code);

    return NextResponse.json({
      success: true,
      token,
      supabase_session: supabaseAuthSession,
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
