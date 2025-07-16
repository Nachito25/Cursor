import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { supabase } from '../../../../lib/supabaseClient';
import { authOptions } from '../../auth/[...nextauth]/route';

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

export async function GET(
  request: Request,
  { params }: any
) {
  const userId = await getUserIdFromSession();
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { data, error } = await supabase
    .from('api_keys')
    .select('*')
    .eq('id', params.id)
    .eq('user_id', userId)
    .single();
  if (error || !data) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(data);
}

export async function PATCH(
  request: Request,
  { params }: any
) {
  const userId = await getUserIdFromSession();
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const body = await request.json();
  const { data, error } = await supabase
    .from('api_keys')
    .update(body)
    .eq('id', params.id)
    .eq('user_id', userId)
    .select()
    .single();
  if (error || !data) return NextResponse.json({ error: 'Update failed' }, { status: 400 });
  return NextResponse.json(data);
}

export async function DELETE(
  request: Request,
  { params }: any
) {
  const userId = await getUserIdFromSession();
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { error } = await supabase
    .from('api_keys')
    .delete()
    .eq('id', params.id)
    .eq('user_id', userId);
  if (error) return NextResponse.json({ error: 'Delete failed' }, { status: 400 });
  return NextResponse.json({ success: true });
} 