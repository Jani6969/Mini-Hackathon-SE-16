const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

/**
 * Fetch price records with optional fish name search and landing site filtering
 */
export async function fetchPrices({ search = '', market = 'All' } = {}) {
  const params = new URLSearchParams();

  if (search && search.trim() !== '') {
    params.append('search', search.trim());
  }

  if (market && market !== 'All') {
    params.append('market', market.trim());
  }

  const query = params.toString() ? `?${params.toString()}` : '';
  const res = await fetch(`${API_BASE}/api/prices${query}`, {
    cache: 'no-store'
  });

  const json = await res.json();
  if (!res.ok || !json.success) {
    throw new Error(json.message || 'Failed to fetch prices');
  }

  return json.data || [];
}

/**
 * Fetch a single price entry by ID
 */
export async function fetchPriceById(id) {
  const res = await fetch(`${API_BASE}/api/prices/${id}`, {
    cache: 'no-store'
  });

  const json = await res.json();
  if (!res.ok || !json.success) {
    throw new Error(json.message || 'Failed to fetch price record');
  }

  return json.data;
}

/**
 * Create a new fish price record
 */
export async function createPrice(entry) {
  const res = await fetch(`${API_BASE}/api/prices`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(entry)
  });

  const json = await res.json();
  if (!json.success) {
    throw new Error(json.message || 'Failed to save price');
  }

  return json.data;
}

/**
 * Delete a price record by ID
 */
export async function deletePrice(id) {
  const res = await fetch(`${API_BASE}/api/prices/${id}`, {
    method: 'DELETE'
  });

  const json = await res.json();
  if (!res.ok || !json.success) {
    throw new Error(json.message || 'Failed to delete record');
  }

  return json;
}

/**
 * Check backend API health
 */
export async function checkServerHealth() {
  try {
    const res = await fetch(`${API_BASE}/`, { cache: 'no-store' });
    const json = await res.json();
    return { ok: res.ok, message: json.message };
  } catch (err) {
    return { ok: false, message: 'Backend unreachable' };
  }
}
