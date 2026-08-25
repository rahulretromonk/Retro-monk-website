import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { signToken } from '@/lib/jwt';

// Supabase configuration
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || '';

const supabase = (supabaseUrl && supabaseKey)
  ? createClient(supabaseUrl, supabaseKey)
  : null;

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }

    // 1. Try Supabase Auth
    if (supabase) {
      try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password
        });

        if (!error && data.session) {
          // Wrap their Supabase session details in our server-signed token, 
          // or return the token directly. Let's sign our own server JWT containing the email.
          const token = signToken({
            email: data.user?.email,
            id: data.user?.id,
            source: 'supabase'
          });
          return NextResponse.json({ token, user: data.user });
        }
      } catch (sbErr) {
        console.warn("Supabase auth attempt failed or errored:", sbErr);
      }
    }

    // 2. Local Fallback credentials (Demo / Backup Mode)
    const localAdminEmails = ['retromonk.office@gmail.com', 'admin@archivalstudio.com'];
    const localAdminPass = 'adminpassword';

    if (localAdminEmails.includes(email.toLowerCase()) && password === localAdminPass) {
      const token = signToken({
        email: email.toLowerCase(),
        id: 'local-admin-id',
        source: 'local-fallback'
      });
      return NextResponse.json({
        token,
        user: { id: 'local-admin-id', email: email.toLowerCase(), role: 'administrator' }
      });
    }

    return NextResponse.json({ error: 'Invalid email or password credentials' }, { status: 401 });
  } catch (error: any) {
    console.error("Authentication route error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
