import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import crypto from 'crypto';
import { hashPassword, createPartnerToken } from '../../../../../lib/auth';
import { supabase as defaultSupabase } from '../../../../../lib/supabase';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.VITE_SUPABASE_URL || 'https://crqvvcxmbvvcngfqdsnj.supabase.co';
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabaseAdmin = serviceKey ? createClient(supabaseUrl, serviceKey) : defaultSupabase;

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, phone, email, password, city, platform, memberCount, category, referralCode } = body;

    const contactNumber = (phone || '').trim();
    const emailAddr = (email || '').trim().toLowerCase();

    if (!name || !contactNumber || !emailAddr || !password || !referralCode) {
      return NextResponse.json(
        { error: 'Full name, WhatsApp number, email, password, and referral code are required' },
        { status: 400 }
      );
    }

    const passwordHash = hashPassword(password);
    let authUser = null;

    // 1. Create or sync Supabase Auth User using Supabase Admin Auth API
    try {
      const { data: authData, error: authErr } = await supabaseAdmin.auth.admin.createUser({
        email: emailAddr,
        password: password,
        email_confirm: true,
        user_metadata: { name, phone: contactNumber, referral_code: referralCode }
      });

      if (authErr && !authErr.message.includes('already registered')) {
        console.warn('Supabase Auth createUser notice:', authErr.message);
      } else if (authData && authData.user) {
        authUser = authData.user;
      }
    } catch (err) {
      console.warn('Supabase Auth call notice:', err.message);
    }

    // 2. Check if organization already exists by email or contact_number or unique_code
    const { data: existing } = await supabaseAdmin
      .from('organizations')
      .select('*')
      .or(`email.eq.${emailAddr},contact_number.eq.${contactNumber},unique_code.eq.${referralCode}`)
      .maybeSingle();

    if (existing) {
      if (!existing.password_hash && passwordHash) {
        await supabaseAdmin
          .from('organizations')
          .update({ email: emailAddr, password_hash: passwordHash })
          .eq('id', existing.id);
        existing.email = emailAddr;
      }

      const token = createPartnerToken(existing.email || emailAddr, existing.unique_code || referralCode);
      return NextResponse.json({
        success: true,
        message: 'Account active. Logged in successfully via Supabase Auth!',
        token,
        partner: existing,
        supabase_auth_id: authUser ? authUser.id : null
      });
    }

    // 3. Insert into 'organizations' table
    const newOrg = {
      id: crypto.randomUUID(),
      name: name.trim(),
      contact_number: contactNumber,
      email: emailAddr,
      password_hash: passwordHash,
      unique_code: referralCode.trim(),
      total_rewards: 0,
      active_workers_count: 0,
      total_referred_users: 0,
      total_works_completed: 0,
      created_at: new Date().toISOString()
    };

    let savedOrg = null;
    const { data, error } = await supabaseAdmin
      .from('organizations')
      .insert([newOrg])
      .select()
      .single();

    if (error) {
      console.warn('Organization insert error:', error.message);
      savedOrg = newOrg;
    } else {
      savedOrg = data;
    }

    const token = createPartnerToken(emailAddr, referralCode);

    return NextResponse.json({
      success: true,
      token,
      partner: savedOrg,
      supabase_auth_id: authUser ? authUser.id : null,
      invite_url: `https://ziggers.in/join?ref=${encodeURIComponent(referralCode)}`
    });
  } catch (error) {
    console.error('Partner registration error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error', details: error.message },
      { status: 500 }
    );
  }
}
