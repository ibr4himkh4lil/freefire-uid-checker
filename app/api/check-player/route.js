import { NextResponse } from 'next/server';
import axios from 'axios';

// ─── In-memory rate limiter (per-IP sliding window) ──────────
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX       = 10;         // 10 requests / IP / min

const rateLimitStore = new Map(); // ip → { count, windowStart }

function getClientIP(request) {
  return (
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip') ||
    '127.0.0.1'
  );
}

function isRateLimited(ip) {
  const now  = Date.now();
  const data = rateLimitStore.get(ip);

  if (!data || now - data.windowStart > RATE_LIMIT_WINDOW_MS) {
    rateLimitStore.set(ip, { count: 1, windowStart: now });
    return false;
  }

  if (data.count >= RATE_LIMIT_MAX) return true;

  data.count += 1;
  return false;
}

// ─── UID validation ───────────────────────────────────────────
function validateUID(uid) {
  if (!uid)                                         return { valid: false, message: 'UID is required.' };
  const str = String(uid).trim();
  if (!/^\d+$/.test(str))                           return { valid: false, message: 'UID must contain only digits.' };
  if (str.length < 6 || str.length > 12)            return { valid: false, message: 'UID must be between 6 and 12 digits.' };
  return { valid: true, uid: str };
}

// ─── POST /api/check-player ────────────────────────────────────
export async function POST(request) {
  const ip = getClientIP(request);

  // Rate limit check
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: 'Too many requests. Please wait a minute before trying again.' },
      { status: 429 }
    );
  }

  // Parse body
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  // Validate UID
  const validation = validateUID(body?.uid);
  if (!validation.valid) {
    return NextResponse.json({ error: validation.message }, { status: 400 });
  }

  const uid = validation.uid;

  // Call external API
  try {
    const response = await axios.post(
      'https://bdgamesbazar.com/api/auth/player_id_login',
      { app_id: 100067, login_id: uid },
      {
        headers: { 'Content-Type': 'application/json' },
        timeout: 10_000, // 10-second timeout
      }
    );

    const data = response.data;

    // Validate response shape
    if (!data || typeof data !== 'object') {
      return NextResponse.json({ error: 'Unexpected response from player service.' }, { status: 502 });
    }

    if (!data.nickname && !data.open_id) {
      return NextResponse.json({ error: 'Player not found. Please check the UID.' }, { status: 404 });
    }

    // Return cleaned, safe response
    return NextResponse.json({
      success: true,
      player: {
        uid:      uid,
        open_id:  data.open_id  || null,
        nickname: data.nickname || 'Unknown',
        region:   data.region   || 'N/A',
        img_url:  data.img_url  || null,
      },
    });
  } catch (error) {
    // Timeout
    if (error.code === 'ECONNABORTED' || error.message?.includes('timeout')) {
      return NextResponse.json(
        { error: 'Request timed out. The player service is slow — please try again.' },
        { status: 504 }
      );
    }

    // External API error response
    if (error.response) {
      const status = error.response.status;
      if (status === 404) {
        return NextResponse.json({ error: 'Player not found. Please check the UID.' }, { status: 404 });
      }
      if (status === 429) {
        return NextResponse.json({ error: 'Service rate limit reached. Please try again later.' }, { status: 429 });
      }
      return NextResponse.json(
        { error: 'Player service returned an error. Please try again later.' },
        { status: 502 }
      );
    }

    // Network error
    if (error.request) {
      return NextResponse.json(
        { error: 'Unable to reach player service. Check your connection.' },
        { status: 503 }
      );
    }

    console.error('[check-player] Unexpected error:', error.message);
    return NextResponse.json({ error: 'An unexpected error occurred.' }, { status: 500 });
  }
}

// Block all other methods
export function GET()    { return NextResponse.json({ error: 'Method not allowed.' }, { status: 405 }); }
export function PUT()    { return NextResponse.json({ error: 'Method not allowed.' }, { status: 405 }); }
export function DELETE() { return NextResponse.json({ error: 'Method not allowed.' }, { status: 405 }); }
