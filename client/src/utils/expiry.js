/**
 * Turns an expiresAt timestamp into a short label for a price card.
 * Computed at render time — no timers, no intervals.
 * Returns null when the record has no expiry (records seeded before TTL).
 */
export function expiryLabel(expiresAt) {
  if (!expiresAt) return null;
  const msLeft = new Date(expiresAt).getTime() - Date.now();
  if (Number.isNaN(msLeft)) return null;
  if (msLeft <= 0) return 'Expired';

  const minutesLeft = Math.floor(msLeft / 60000);
  if (minutesLeft < 60) return minutesLeft < 10 ? 'Expiring soon' : `Expires in ${minutesLeft}m`;
  return `Expires in ${Math.floor(minutesLeft / 60)}h`;
}
