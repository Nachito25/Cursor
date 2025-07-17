import { NextResponse } from 'next/server';
import { supabase } from "../../../lib/supabaseClient";

const API_KEY_LIMIT = 1000; // You can make this dynamic per key if you add a column for limit

/**
 * Validates the API key and returns its data if valid.
 * @param {string} apiKey - The API key value
 * @returns {Promise<{ valid: boolean, keyData?: any, error?: string }>}
 */
async function validateApiKey(apiKey) {
  const { data: keyData, error } = await supabase
    .from('api_keys')
    .select('id, usage')
    .eq('value', apiKey)
    .maybeSingle();
  if (error && error.code !== 'PGRST116') {
    return { valid: false, error: 'Database error' };
  }
  if (!keyData) {
    return { valid: false, error: 'Invalid API key' };
  }
  return { valid: true, keyData };
}

/**
 * Increments usage for the API key and checks if under the limit.
 * @param {object} keyData - The API key data object
 * @returns {Promise<{ allowed: boolean, error?: string }>}
 */
async function incrementUsageAndCheckLimit(keyData) {
  if (keyData.usage >= API_KEY_LIMIT) {
    return { allowed: false, error: 'Rate limit exceeded' };
  }
  const { error: updateError } = await supabase
    .from('api_keys')
    .update({ usage: keyData.usage + 1 })
    .eq('id', keyData.id);
  if (updateError) {
    return { allowed: false, error: 'Failed to update usage' };
  }
  return { allowed: true };
}

export async function POST(req) {
  const { githubUrl } = await req.json();
  const apiKey = req.headers.get('x-api-key');

  if (!apiKey) {
    return NextResponse.json({ message: 'API key is required' }, { status: 400 });
  }

  try {
    const { valid, keyData, error: validationError } = await validateApiKey(apiKey);
    if (!valid) {
      return NextResponse.json({ message: validationError || 'Invalid API key' }, { status: 401 });
    }
    const { allowed, error: usageError } = await incrementUsageAndCheckLimit(keyData);
    if (!allowed) {
      if (usageError === 'Rate limit exceeded') {
        return NextResponse.json({ message: usageError }, { status: 429 });
      }
      return NextResponse.json({ message: usageError || 'Unknown error' }, { status: 500 });
    }
    // If valid and under limit, continue with your GitHub summarizer logic here
    return NextResponse.json({ message: 'API key validated successfully', githubUrl }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: 'Server error', error: err.message }, { status: 500 });
  }
} 



