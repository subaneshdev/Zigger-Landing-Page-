import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { parsePartnerToken } from '../../../../../lib/auth';
import { supabase as defaultSupabase } from '../../../../../lib/supabase';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.VITE_SUPABASE_URL || 'https://crqvvcxmbvvcngfqdsnj.supabase.co';
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabaseAdmin = serviceKey ? createClient(supabaseUrl, serviceKey) : defaultSupabase;

export async function GET(request) {
  try {
    const authHeader = request.headers.get('authorization');
    const { searchParams } = new URL(request.url);
    const queryCode = searchParams.get('code');
    const queryEmail = searchParams.get('email');

    let tokenPayload = null;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      tokenPayload = parsePartnerToken(authHeader.split(' ')[1]);
    }

    const code = queryCode || (tokenPayload ? tokenPayload.code : null);
    const email = queryEmail || (tokenPayload ? tokenPayload.email : null);

    if (!code && !email) {
      return NextResponse.json(
        { error: 'Unauthorized or missing partner session' },
        { status: 401 }
      );
    }

    let partner = null;
    let query = supabaseAdmin.from('organizations').select('*');
    if (code) {
      query = query.eq('unique_code', code);
    } else if (email) {
      query = query.eq('email', email);
    }
    const { data } = await query.maybeSingle();
    partner = data;

    if (!partner) {
      return NextResponse.json(
        { error: 'Partner account not found' },
        { status: 404 }
      );
    }

    // Query profiles referred by partner's unique_code
    let referredMembers = [];
    let totalWorksDone = 0;
    if (partner.unique_code) {
      const { data: members } = await supabaseAdmin
        .from('profiles')
        .select('id, full_name, mobile, created_at, referral_earnings, completed_orders')
        .or(`referred_by_code.eq.${partner.unique_code},employer_referral_code.eq.${partner.unique_code}`);

      if (members && members.length > 0) {
        referredMembers = members.map((m) => {
          const works = Number(m.completed_orders || 0);
          totalWorksDone += works;
          return {
            id: m.id,
            name: m.full_name || 'Community Member',
            phone: m.mobile ? `${m.mobile.slice(0, 7)}*****` : 'N/A',
            date_joined: m.created_at ? m.created_at.split('T')[0] : 'N/A',
            works_completed: works,
            status: m.referral_earnings > 0 || works > 0 ? 'REWARD_CLAIMED' : 'PENDING_FIRST_ZIG',
            reward_earned: m.referral_earnings > 0 ? `₹${m.referral_earnings}` : works > 0 ? `₹${Math.floor(works / 5) * 20 + 20}` : '₹20 (Pending Gig)'
          };
        });

        // Sync counts
        const activeCount = referredMembers.filter(m => m.works_completed > 0 || m.status === 'REWARD_CLAIMED').length;
        await supabaseAdmin
          .from('organizations')
          .update({
            total_referred_users: referredMembers.length,
            active_workers_count: activeCount,
            total_works_completed: totalWorksDone
          })
          .eq('id', partner.id);
      }
    }

    const activeCount = referredMembers.filter(m => m.works_completed > 0 || m.status === 'REWARD_CLAIMED').length;

    return NextResponse.json({
      success: true,
      partner: {
        id: partner.id,
        name: partner.name,
        contact_number: partner.contact_number,
        email: partner.email,
        unique_code: partner.unique_code,
        total_rewards: Number(partner.total_rewards || 0),
        total_referred_users: referredMembers.length || Number(partner.total_referred_users || 0),
        active_workers_count: activeCount || Number(partner.active_workers_count || 0),
        total_works_completed: totalWorksDone || Number(partner.total_works_completed || 0),
        created_at: partner.created_at
      },
      invite_url: `https://ziggers.in/join?ref=${encodeURIComponent(partner.unique_code)}`,
      referred_members: referredMembers
    });
  } catch (error) {
    console.error('Fetch partner profile error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error', details: error.message },
      { status: 500 }
    );
  }
}
