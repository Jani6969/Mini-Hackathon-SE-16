export const PIN_PATTERN = /^\d{4}$/;

/**
 * Reads a 4-digit PIN out of an input event, keeping only digits.
 *
 * The explicit write back to event.target.value matters. When the typed
 * character is rejected — a letter, or a fifth digit — the sanitised string is
 * identical to the value already in state, so React skips the re-render and the
 * rejected character stays sitting in the DOM input. It then counts against
 * maxLength and silently blocks the next real digit. Writing the sanitised
 * value straight back keeps the input and the state in step either way.
 */
export function readPin(event) {
  const cleaned = event.target.value.replace(/\D/g, '').slice(0, 4);
  if (event.target.value !== cleaned) event.target.value = cleaned;
  return cleaned;
}
