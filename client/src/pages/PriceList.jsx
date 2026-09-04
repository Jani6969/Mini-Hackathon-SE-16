import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function PriceList({ prices = [], loading = false }) {
  const [search, setSearch] = useState('');
  const [market, setMarket] = useState('All');

  const markets = ['All', ...new Set(prices.map((p) => p.market).filter(Boolean))];

  const filtered = prices.filter((p) => {
    const fishName = (p.fish || '').toLowerCase();
    const matchesFish = fishName.includes(search.trim().toLowerCase());
    const matchesMarket = market === 'All' || p.market === market;
    return matchesFish && matchesMarket;
  });

  const avg = filtered.length
    ? Math.round(filtered.reduce((sum, p) => sum + Number(p.price || 0), 0) / filtered.length)
    : 0;

  if (loading) {
    return (
      <div className="page">
        <p>Loading prices...</p>
      </div>
    );
  }

  return (
    <div className="page">
      <div className="page-head">
        <div>
          <h1>Today's Prices</h1>
          <p className="muted">Search a fish, filter a landing site, and check the live average before you sell.</p>
        </div>
        <Link className="btn" to="/add">
          Report a price
        </Link>
      </div>

      <div className="filters">
        <input
          type="search"
          placeholder="Search fish type..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          aria-label="Search fish type"
        />
        <select
          value={market}
          onChange={(e) => setMarket(e.target.value)}
          aria-label="Filter by landing site"
        >
          {markets.map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </select>
      </div>

      <p className="summary">
        Showing <b>{filtered.length}</b> {filtered.length === 1 ? 'entry' : 'entries'}
        {' · '}Average price <b>Rs. {avg.toLocaleString('en-LK')}</b> /kg
      </p>

      {filtered.length === 0 && (
        <p className="muted empty-state">No prices found for that search.</p>
      )}

      <div className="grid">
        {filtered.map((p) => (
          <div className="card price-card" key={p._id}>
            <p className="site-chip">{p.market}</p>
            <h3>{p.fish}</h3>
            <p className="price">Rs. {Number(p.price).toLocaleString('en-LK')} /kg</p>
            <p className="muted">{p.date}</p>
            <p className="muted">Reported by {p.seller}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
