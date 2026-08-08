import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { supabase as defaultSupabase } from '../../../../lib/supabase';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.VITE_SUPABASE_URL || 'https://crqvvcxmbvvcngfqdsnj.supabase.co';
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabaseAdmin = serviceKey ? createClient(supabaseUrl, serviceKey) : defaultSupabase;

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get('code') || searchParams.get('referral_code');
    const phone = searchParams.get('phone');

    if (!code && !phone) {
      return NextResponse.json(
        { error: 'Referral code or phone number parameter is required' },
        { status: 400 }
      );
    }

    let organizationData = null;
    let referredMembers = [];
    let totalWorksDone = 0;

    try {
      let query = supabaseAdmin.from('organizations').select('*');
      if (code) {
        query = query.eq('unique_code', code);
      } else if (phone) {
        query = query.eq('contact_number', phone);
      }
      const { data } = await query.maybeSingle();
      organizationData = data;

      const targetCode = code || (organizationData ? organizationData.unique_code : null);
      if (targetCode) {
        const { data: members } = await supabaseAdmin
          .from('profiles')
          .select('id, full_name, mobile, created_at, referral_earnings, completed_orders')
          .or(`referred_by_code.eq.${targetCode},employer_referral_code.eq.${targetCode}`);

        if (members && members.length > 0) {
          referredMembers = members.map((m) => {
            const completedCount = Number(m.completed_orders || 0);
            totalWorksDone += completedCount;

            return {
              id: m.id,
              name: m.full_name || 'Community Member',
              phone: m.mobile ? `${m.mobile.slice(0, 7)}*****` : 'N/A',
              date_joined: m.created_at ? m.created_at.split('T')[0] : 'N/A',
              works_completed: completedCount,
              status: m.referral_earnings > 0 || completedCount > 0 ? 'REWARD_CLAIMED' : 'PENDING_FIRST_ZIG',
              reward_earned: m.referral_earnings > 0 ? `₹${m.referral_earnings}` : completedCount > 0 ? `₹${Math.floor(completedCount / 5) * 20 + 20}` : '₹20 (Pending Gig)'
            };
          });

          // Sync total_works_completed, total_referred_users, active_workers_count to organizations table
          if (organizationData && organizationData.id) {
            const activeCount = referredMembers.filter(m => m.works_completed > 0 || m.status === 'REWARD_CLAIMED').length;
            await supabaseAdmin
              .from('organizations')
              .update({
                total_referred_users: referredMembers.length,
                active_workers_count: activeCount,
                total_works_completed: totalWorksDone
              })
              .eq('id', organizationData.id);
          }
        }
      }
    } catch (err) {
      console.warn('Database fetch notice:', err.message);
    }

    const refCode = code || (organizationData ? organizationData.unique_code : 'N/A');
    const totalInvited = referredMembers.length;
    const activeCount = referredMembers.filter((m) => m.works_completed > 0 || m.status === 'REWARD_CLAIMED').length;
    const totalEarned = organizationData ? Number(organizationData.total_rewards || 0) : activeCount * 20;

    return NextResponse.json({
      success: true,
      data: {
        referral_code: refCode,
        invite_url: `https://ziggers.in/join?ref=${encodeURIComponent(refCode)}`,
        organization: organizationData,
        metrics: {
          total_invited: organizationData?.total_referred_users ?? totalInvited,
          converted_referrals: organizationData?.active_workers_count ?? activeCount,
          total_works_completed: organizationData?.total_works_completed ?? totalWorksDone,
          total_cash_earned: totalEarned
        },
        referred_members: referredMembers
      }
    });
  } catch (error) {
    console.error('Error fetching my referrals:', error);
    return NextResponse.json(
      { error: 'Internal Server Error', details: error.message },
      { status: 500 }
    );
  }
}
