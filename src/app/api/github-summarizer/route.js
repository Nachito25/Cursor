import { NextResponse } from 'next/server';
import { supabase } from '../../lib/supabaseClient';

export async function POST(req) {
  const { githubUrl } = await req.json();
  const apiKey = req.headers.get('x-api-key');

  if (!apiKey) {
    return NextResponse.json({ message: 'API key is required' }, { status: 400 });
  }

  // Validate API key
  try {
    const { data, error } = await supabase
      .from('api_keys')
      .select('id')
      .eq('value', apiKey)
      .maybeSingle();

    if (error && error.code !== 'PGRST116') {
      throw error;
    }

    if (!data) {
      return NextResponse.json({ message: 'Invalid API key' }, { status: 401 });
    }

    // If valid, continue with your GitHub summarizer logic here
    return NextResponse.json({ message: 'API key validated successfully', githubUrl }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: 'Server error', error: err.message }, { status: 500 });
  }
} 



