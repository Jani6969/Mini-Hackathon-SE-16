const BASE = import.meta.env.VITE_API_URL;

const JSON_HEADERS = { 'Content-Type': 'application/json' };

/**
 * Unwraps the API envelope. Any non-2xx, unsuccessful or non-JSON reply becomes
 * a thrown Error carrying a message the UI can show as-is.
 */
async function readJson(response) {
  let json;
  try {
    json = await response.json();
  } catch {
    throw new Error(`Server returned an unexpected response (HTTP ${response.status}).`);
  }
  if (!response.ok || !json.success) throw new Error(json.message || 'Request failed');
  return json.data;
}

export async function getPrices() {
  return readJson(await fetch(`${BASE}/api/prices`));
}

export async function createPrice(entry) {
  const response = await fetch(`${BASE}/api/prices`, {
    method: 'POST',
    headers: JSON_HEADERS,
    body: JSON.stringify(entry)
  });
  return readJson(response);
}

export async function updatePrice(id, entry) {
  const response = await fetch(`${BASE}/api/prices/${id}`, {
    method: 'PUT',
    headers: JSON_HEADERS,
    body: JSON.stringify(entry)
  });
  return readJson(response);
}

/** DELETE carries the PIN in the JSON body — never in the URL, where it would be logged. */
export async function deletePrice(id, editPin) {
  const response = await fetch(`${BASE}/api/prices/${id}`, {
    method: 'DELETE',
    headers: JSON_HEADERS,
    body: JSON.stringify({ editPin })
  });
  await readJson(response);
}
