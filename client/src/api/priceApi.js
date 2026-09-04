const BASE = import.meta.env.VITE_API_URL;

async function readJson(response) {
  const json = await response.json();
  if (!response.ok || !json.success) throw new Error(json.message || 'Request failed');
  return json.data;
}

export async function getPrices() {
  return readJson(await fetch(`${BASE}/api/prices`));
}

export async function createPrice(entry) {
  const response = await fetch(`${BASE}/api/prices`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(entry)
  });
  return readJson(response);
}
