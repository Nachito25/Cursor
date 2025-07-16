import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { supabase } from '../../../lib/supabaseClient';
import { authOptions } from '../auth/authOptions';

// Helper to get user_id from session
async function getUserIdFromSession() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) return null;
  const { data, error } = await supabase
    .from('users')
    .select('id')
    .eq('email', session.user.email)
    .single();
  if (error || !data) return null;
  return data.id;
}

export async function GET() {
  const userId = await getUserIdFromSession();
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { data, error } = await supabase
    .from('api_keys')
    .select('*')
    .eq('user_id', userId)
    .order('id', { ascending: true });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function POST(request: Request) {
  const userId = await getUserIdFromSession();
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { name, value } = await request.json();
  const { data, error } = await supabase
    .from('api_keys')
    .insert({ name, value, usage: 0, user_id: userId })
    .select()
    .single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data, { status: 201 });
} 