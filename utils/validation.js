/**
 * Client-side UID validation utilities
 */

/**
 * Validates a Free Fire UID string.
 * Returns { valid: boolean, message?: string }
 */
export function validateUID(uid) {
  const str = String(uid || '').trim();

  if (!str) {
    return { valid: false, message: 'Please enter a Free Fire UID.' };
  }

  if (!/^\d+$/.test(str)) {
    return { valid: false, message: 'UID must contain digits only — no letters or symbols.' };
  }

  if (str.length < 6) {
    return { valid: false, message: 'UID is too short. Minimum 6 digits.' };
  }

  if (str.length > 12) {
    return { valid: false, message: 'UID is too long. Maximum 12 digits.' };
  }

  return { valid: true };
}

/**
 * Sanitises a raw UID input — strips non-digits and trims whitespace.
 */
export function sanitizeUID(raw) {
  return String(raw || '').replace(/\D/g, '').trim();
}

/**
 * Returns true when the input looks like a plausible UID (for real-time feedback).
 */
export function looksLikeUID(raw) {
  const str = sanitizeUID(raw);
  return str.length >= 6 && str.length <= 12;
}
