import { NextResponse } from 'next/server';
import axios from 'axios';

// ─── In-memory rate limiter ──────────────────────────────────
const RATE_LIMIT_WINDOW_MS = 60 * 1000;
const RATE_LIMIT_MAX = 10;

const rateLimitStore = new Map();

function getClientIP(request) {
  return (
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip') ||
    '127.0.0.1'
  );
}

function isRateLimited(ip) {
  const now = Date.now();
  const data = rateLimitStore.get(ip);

  if (!data || now - data.windowStart > RATE_LIMIT_WINDOW_MS) {
    rateLimitStore.set(ip, {
      count: 1,
      windowStart: now,
    });
    return false;
  }

  if (data.count >= RATE_LIMIT_MAX) {
    return true;
  }

  data.count += 1;
  return false;
}

// ─── UID validation ──────────────────────────────────────────
function validateUID(uid) {
  if (!uid) {
    return {
      valid: false,
      message: 'UID is required.',
    };
  }

  const str = String(uid).trim();

  if (!/^\d+$/.test(str)) {
    return {
      valid: false,
      message: 'UID must contain only digits.',
    };
  }

  if (str.length < 6 || str.length > 12) {
    return {
      valid: false,
      message: 'UID must be between 6 and 12 digits.',
    };
  }

  return {
    valid: true,
    uid: str,
  };
}

// ─── POST /api/check-player ─────────────────────────────────
export async function POST(request) {
  const ip = getClientIP(request);

  // Rate limit
  if (isRateLimited(ip)) {
    return NextResponse.json(
      {
        error: 'Too many requests. Please wait a minute.',
      },
      {
        status: 429,
      }
    );
  }

  // Parse body
  let body;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      {
        error: 'Invalid request body.',
      },
      {
        status: 400,
      }
    );
  }

  // Validate UID
  const validation = validateUID(body?.uid);

  if (!validation.valid) {
    return NextResponse.json(
      {
        error: validation.message,
      },
      {
        status: 400,
      }
    );
  }

  const uid = validation.uid;

  try {
    // ─── STEP 1: Get cookies from homepage ───────────────────
    const homeResponse = await axios.get(
      'https://bdgamesbazar.com/',
      {
        headers: {
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/124.0.0.0 Safari/537.36',
          Accept:
            'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        },
      }
    );

    const cookies = homeResponse.headers['set-cookie'];

    if (!cookies || !cookies.length) {
      return NextResponse.json(
        {
          error: 'Failed to initialize session.',
        },
        {
          status: 500,
        }
      );
    }

    const cookieHeader = cookies
      .map((cookie) => cookie.split(';')[0])
      .join('; ');

    // ─── STEP 2: Call player API ─────────────────────────────
    const response = await axios.post(
      'https://bdgamesbazar.com/api/auth/player_id_login',
      {
        app_id: 100067,
        login_id: uid,
      },
      {
        timeout: 15000,

        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json, text/plain, */*',

          Origin: 'https://bdgamesbazar.com',
          Referer: 'https://bdgamesbazar.com/',

          Cookie: cookieHeader,

          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/124.0.0.0 Safari/537.36',
        },
      }
    );

    const data = response.data;

    // Invalid response
    if (!data || typeof data !== 'object') {
      return NextResponse.json(
        {
          error: 'Unexpected response from player service.',
        },
        {
          status: 502,
        }
      );
    }

    // Player not found
    if (!data.nickname && !data.open_id) {
      return NextResponse.json(
        {
          error: 'Player not found.',
        },
        {
          status: 404,
        }
      );
    }

    // Success response
    return NextResponse.json({
      success: true,

      player: {
        uid: uid,
        open_id: data.open_id || null,
        nickname: data.nickname || 'Unknown',
        region: data.region || 'N/A',
        img_url: data.img_url || null,
      },
    });
  } catch (error) {
    console.error('API ERROR:', error?.response?.data || error.message);

    // Timeout
    if (
      error.code === 'ECONNABORTED' ||
      error.message?.includes('timeout')
    ) {
      return NextResponse.json(
        {
          error: 'Request timed out.',
        },
        {
          status: 504,
        }
      );
    }

    // External API error
    if (error.response) {
      return NextResponse.json(
        {
          error:
            error.response.data?.message ||
            'Player service returned an error.',
        },
        {
          status: error.response.status || 502,
        }
      );
    }

    // Network error
    if (error.request) {
      return NextResponse.json(
        {
          error: 'Unable to reach player service.',
        },
        {
          status: 503,
        }
      );
    }

    // Unknown error
    return NextResponse.json(
      {
        error: 'An unexpected error occurred.',
      },
      {
        status: 500,
      }
    );
  }
}

// ─── Block other methods ────────────────────────────────────
export function GET() {
  return NextResponse.json(
    {
      error: 'Method not allowed.',
    },
    {
      status: 405,
    }
  );
}

export function PUT() {
  return NextResponse.json(
    {
      error: 'Method not allowed.',
    },
    {
      status: 405,
    }
  );
}

export function DELETE() {
  return NextResponse.json(
    {
      error: 'Method not allowed.',
    },
    {
      status: 405,
    }
  );
}
