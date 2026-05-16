/**
 * Miscellaneous helper utilities
 */

/**
 * Copies text to the clipboard. Returns true on success, false on failure.
 */
export async function copyToClipboard(text) {
  try {
    if (navigator?.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }
    // Fallback for older browsers
    const el = document.createElement('textarea');
    el.value = text;
    el.style.position = 'fixed';
    el.style.opacity = '0';
    document.body.appendChild(el);
    el.focus();
    el.select();
    const success = document.execCommand('copy');
    document.body.removeChild(el);
    return success;
  } catch {
    return false;
  }
}

/**
 * Maps a region code to a human-readable label and flag emoji.
 */
export function getRegionInfo(code) {
  const regions = {
    BD: { label: 'Bangladesh',    flag: '🇧🇩' },
    IN: { label: 'India',         flag: '🇮🇳' },
    ID: { label: 'Indonesia',     flag: '🇮🇩' },
    SG: { label: 'Singapore',     flag: '🇸🇬' },
    TH: { label: 'Thailand',      flag: '🇹🇭' },
    VN: { label: 'Vietnam',       flag: '🇻🇳' },
    PH: { label: 'Philippines',   flag: '🇵🇭' },
    MY: { label: 'Malaysia',      flag: '🇲🇾' },
    TW: { label: 'Taiwan',        flag: '🇹🇼' },
    BR: { label: 'Brazil',        flag: '🇧🇷' },
    NA: { label: 'North America', flag: '🌎' },
    EU: { label: 'Europe',        flag: '🌍' },
    ME: { label: 'Middle East',   flag: '🌍' },
    TR: { label: 'Turkey',        flag: '🇹🇷' },
    RU: { label: 'Russia',        flag: '🇷🇺' },
    PK: { label: 'Pakistan',      flag: '🇵🇰' },
  };
  return regions[code?.toUpperCase()] || { label: code || 'Unknown', flag: '🌐' };
}

/**
 * Truncates a long nickname for display.
 */
export function truncateNickname(name, maxLen = 18) {
  if (!name) return 'Unknown';
  return name.length > maxLen ? name.slice(0, maxLen) + '…' : name;
}

/**
 * Returns a relative time string like "just now", "2 min ago".
 */
export function relativeTime(date) {
  const diff = Date.now() - new Date(date).getTime();
  const sec  = Math.floor(diff / 1000);
  if (sec < 5)   return 'just now';
  if (sec < 60)  return `${sec}s ago`;
  if (sec < 3600) return `${Math.floor(sec / 60)}m ago`;
  return `${Math.floor(sec / 3600)}h ago`;
}

/**
 * Generates a deterministic avatar fallback color from a UID string.
 */
export function uidToColor(uid) {
  const colors = ['#FF6B00', '#FF2D55', '#FFB300', '#00C7FF', '#7B2FFF', '#00E676'];
  let hash = 0;
  for (const ch of String(uid)) hash = (hash * 31 + ch.charCodeAt(0)) & 0xffffffff;
  return colors[Math.abs(hash) % colors.length];
}

/**
 * Debounce utility.
 */
export function debounce(fn, delay) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}
