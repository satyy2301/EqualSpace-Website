import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';
import { registrationSchema } from '@/lib/registration-schema';

export const dynamic = 'force-dynamic';

const UNIQUE_VIOLATION = '23505';

export async function POST(request: Request) {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return NextResponse.json(
      { status: 'error', message: 'Registrations are not available right now. Please try again shortly.' },
      { status: 503 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { status: 'invalid', message: 'We could not read your submission. Please try again.' },
      { status: 400 },
    );
  }

  const parsed = registrationSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      {
        status: 'invalid',
        message: 'Please review the highlighted fields.',
        fieldErrors: parsed.error.flatten().fieldErrors,
      },
      { status: 400 },
    );
  }

  const input = parsed.data;
  const supabase = createClient(supabaseUrl, supabaseKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  const { error } = await supabase.from('registrations').insert({
    full_name: input.fullName,
    email: input.email,
    city: input.city,
    gender: input.gender ?? null,
    interested_in: input.interestedIn ?? null,
    relationship_intention: input.relationshipIntention,
    is_adult: input.isAdult,
    accepted_terms: input.acceptedTerms,
  });

  if (error) {
    if (error.code === UNIQUE_VIOLATION) {
      return NextResponse.json(
        { status: 'duplicate', message: 'This email is already on the EqualSpace early access list.' },
        { status: 409 },
      );
    }
    return NextResponse.json(
      { status: 'error', message: 'We could not save your registration. Please try again shortly.' },
      { status: 500 },
    );
  }

  return NextResponse.json({ status: 'success' }, { status: 201 });
}
