import axios from 'axios';

// Internal API base URL — always use relative path so it works on any host
const API_BASE = '/api';

/**
 * Axios instance configured for the internal API.
 */
const apiClient = axios.create({
  baseURL: API_BASE,
  timeout: 15_000,
  headers: { 'Content-Type': 'application/json' },
});

// ─── Request interceptor ──────────────────────────────────────
apiClient.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error)
);

// ─── Response interceptor — normalise errors ──────────────────
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Timeout
    if (error.code === 'ECONNABORTED' || error.message?.includes('timeout')) {
      throw new PlayerServiceError('Request timed out. Please try again.', 504);
    }

    // No response (network down)
    if (!error.response) {
      throw new PlayerServiceError(
        'Cannot reach server. Check your internet connection.',
        503
      );
    }

    // Use server-provided message when available
    const serverMsg = error.response?.data?.error;
    throw new PlayerServiceError(
      serverMsg || `Server error (${error.response.status}).`,
      error.response.status
    );
  }
);

/** Typed error class for the player service. */
export class PlayerServiceError extends Error {
  constructor(message, statusCode = 500) {
    super(message);
    this.name       = 'PlayerServiceError';
    this.statusCode = statusCode;
  }
}

/**
 * Look up a Free Fire player by UID.
 *
 * @param   {string|number} uid  The player's Free Fire UID.
 * @returns {Promise<{ uid, open_id, nickname, region, img_url }>}
 * @throws  {PlayerServiceError}
 */
export async function checkPlayer(uid) {
  const response = await apiClient.post('/check-player', { uid: String(uid).trim() });
  return response.data.player;
}
