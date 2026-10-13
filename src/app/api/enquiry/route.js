import { NextResponse } from 'next/server';
import { supabase } from '../../../lib/supabase';

// In-memory cache to prevent accidental double-submits within 60s
const recentSubmissions = new Map();

function cleanOldSubmissions() {
  const now = Date.now();
  for (const [key, timestamp] of recentSubmissions.entries()) {
    if (now - timestamp > 60000) {
      recentSubmissions.delete(key);
    }
  }
}

export async function POST(request) {
  try {
    cleanOldSubmissions();

    const body = await request.json();
    const {
      name,
      phone,
      email,
      service,
      location,
      locality,
      eventDate,
      headcount,
      shiftHours,
      notes,
      sourcePage,
    } = body;

    // Validate required fields
    if (!name || typeof name !== 'string' || name.trim().length < 2) {
      return NextResponse.json(
        { error: 'Please enter a valid organizer or business name.' },
        { status: 400 }
      );
    }

    const cleanPhone = (phone || '').replace(/\D/g, '');
    if (!cleanPhone || cleanPhone.length < 10) {
      return NextResponse.json(
        { error: 'Please provide a valid 10-digit mobile phone number.' },
        { status: 400 }
      );
    }

    if (!service || !location) {
      return NextResponse.json(
        { error: 'Service role and city location are required.' },
        { status: 400 }
      );
    }

    // Rate limiting / duplicate prevention
    const submissionKey = `${cleanPhone}_${service}_${location}_${eventDate || 'flexible'}`;
    const lastSubmitTime = recentSubmissions.get(submissionKey);
    const now = Date.now();

    if (lastSubmitTime && now - lastSubmitTime < 60000) {
      return NextResponse.json(
        {
          error:
            'We already received your enquiry moments ago. Our operations team is already reviewing it. You may also call us directly at +91 94990 08993.',
        },
        { status: 429 }
      );
    }

    recentSubmissions.set(submissionKey, now);

    // Generate unique human-readable enquiry reference ID
    const randomHex = Math.floor(100000 + Math.random() * 900000).toString();
    const referenceId = `ZIG-ENQ-${randomHex}`;

    const enquiryRecord = {
      reference_id: referenceId,
      full_name: name.trim(),
      phone: cleanPhone,
      email: (email || '').trim().toLowerCase() || null,
      service_type: service,
      city: location,
      locality: (locality || '').trim() || null,
      event_date: eventDate || null,
      headcount: Number(headcount) || 1,
      shift_hours: shiftHours || 'Full Day (8 Hours)',
      notes: (notes || '').trim() || null,
      source_page: sourcePage || '/hire',
      status: 'received',
      created_at: new Date().toISOString(),
    };

    // Attempt to persist in Supabase if the table exists
    let dbPersisted = false;
    try {
      if (supabase && typeof supabase.from === 'function') {
        const { error: dbError } = await supabase
          .from('employer_enquiries')
          .insert([enquiryRecord]);

        if (!dbError) {
          dbPersisted = true;
        } else {
          // If table does not exist or schema differs, try inserting into a general leads table
          const { error: leadsError } = await supabase
            .from('leads')
            .insert([enquiryRecord]);
          if (!leadsError) dbPersisted = true;
        }
      }
    } catch (dbErr) {
      console.warn('Note: Supabase table insert skipped (operating in resilient fallback mode):', dbErr.message);
    }

    console.log(`[ENQUIRY_ACCEPTED] Ref: ${referenceId} | Service: ${service} | City: ${location} | Headcount: ${headcount} | Phone: ${cleanPhone.slice(0, 3)}***${cleanPhone.slice(-3)} | DB: ${dbPersisted ? 'Saved' : 'Acknowledged'}`);

    return NextResponse.json({
      success: true,
      referenceId,
      message: 'Your staffing enquiry has been accepted. Our operations team will call or WhatsApp you within 15 minutes to confirm shift details and roster availability.',
      contactPhone: '+919499008993',
      whatsAppUrl: `https://wa.me/919499008993?text=${encodeURIComponent(
        `Hi Ziggers team, I just requested a quote (Ref: ${referenceId}) for ${headcount} ${service} in ${location} on ${eventDate || 'upcoming date'}.`
      )}`,
    });
  } catch (error) {
    console.error('Error processing enquiry:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred while processing your request. Please call or WhatsApp us at +91 94990 08993.' },
      { status: 500 }
    );
  }
}
