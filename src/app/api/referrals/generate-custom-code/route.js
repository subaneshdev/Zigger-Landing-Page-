import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import crypto from 'crypto';
import { supabase as defaultSupabase } from '../../../../lib/supabase';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.VITE_SUPABASE_URL || 'https://crqvvcxmbvvcngfqdsnj.supabase.co';
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabaseAdmin = serviceKey ? createClient(supabaseUrl, serviceKey) : defaultSupabase;

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, phone, city, platform, memberCount, category, referralCode } = body;

    const contactNumber = phone || '';

    if (!name || !contactNumber || !referralCode) {
      return NextResponse.json(
        { error: 'Name, phone number, and referral code are required' },
        { status: 400 }
      );
    }

    let savedOrg = null;
    let dbError = null;

    try {
      // Check if organization already exists by contact_number or unique_code
      const { data: existing } = await supabaseAdmin
        .from('organizations')
        .select('*')
        .or(`contact_number.eq.${contactNumber},unique_code.eq.${referralCode}`)
        .maybeSingle();

      if (existing) {
        savedOrg = existing;
      } else {
        // Insert into 'organizations' table
        const orgPayload = {
          id: crypto.randomUUID(),
          name: name.trim(),
          contact_number: contactNumber.trim(),
          unique_code: referralCode.trim(),
          total_rewards: 0,
          active_workers_count: 0,
          total_referred_users: 0,
          created_at: new Date().toISOString()
        };

        const { data, error } = await supabaseAdmin
          .from('organizations')
          .insert([orgPayload])
          .select()
          .single();

        if (error) {
          // If active_workers_count column doesn't exist yet, insert basic payload
          if (error.code === 'PGRST204' || error.message.includes('column')) {
            const fallbackPayload = {
              id: crypto.randomUUID(),
              name: name.trim(),
              contact_number: contactNumber.trim(),
              unique_code: referralCode.trim(),
              total_rewards: 0,
              created_at: new Date().toISOString()
            };
            const { data: fbData, error: fbErr } = await supabaseAdmin
              .from('organizations')
              .insert([fallbackPayload])
              .select()
              .single();

            if (fbErr) {
              dbError = fbErr.message;
            } else {
              savedOrg = fbData;
            }
          } else {
            console.warn('Supabase organizations insert error:', error.message);
            dbError = error.message;
          }
        } else {
          savedOrg = data;
        }
      }
    } catch (err) {
      console.warn('Database connection notice:', err.message);
      dbError = err.message;
    }

    const inviteUrl = `https://ziggers.in/join?ref=${encodeURIComponent(referralCode)}`;

    return NextResponse.json({
      success: true,
      referral_code: referralCode,
      invite_url: inviteUrl,
      organization: savedOrg || {
        name,
        contact_number: contactNumber,
        unique_code: referralCode,
        total_rewards: 0,
        active_workers_count: 0,
        total_referred_users: 0
      },
      db_status: dbError ? `Notice: ${dbError}` : 'synced'
    });
  } catch (error) {
    console.error('Error generating custom referral code:', error);
    return NextResponse.json(
      { error: 'Internal Server Error', details: error.message },
      { status: 500 }
    );
  }
}
