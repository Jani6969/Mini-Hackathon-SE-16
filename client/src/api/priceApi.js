const BASE = import.meta.env.VITE_API_URL;

export async function getPrices() {
  const res = await fetch(`${BASE}/api/prices`);
  const json = await res.json();
  if (!json.success) throw new Error(json.message);
  return json.data;
}

export async function createPrice(entry) {
  const res = await fetch(`${BASE}/api/prices`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(entry)
  });
  const json = await res.json();
  if (!json.success) throw new Error(json.message);
  return json.data;
}
