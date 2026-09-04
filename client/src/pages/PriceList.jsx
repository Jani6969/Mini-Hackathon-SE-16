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
        <div className="skeleton-block" />
        <div className="grid">
          <div className="skeleton-card" />
          <div className="skeleton-card" />
          <div className="skeleton-card" />
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <div className="page-head">
        <div>
          <p className="eyebrow">Morning tide · live board</p>
          <h1>Today's Prices</h1>
          <p className="muted">
            Search a fish, filter a landing site, and check the live average before you sell.
          </p>
        </div>
        <Link className="btn" to="/add">
          Report a price
        </Link>
      </div>

      <div className="toolbar card">
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
      </div>

      {filtered.length === 0 && (
        <div className="card empty-state">
          <h3>No prices found for that search.</h3>
          <p className="muted">Try another fish name, or switch the landing site back to All.</p>
        </div>
      )}

      <div className="grid">
        {filtered.map((p) => {
          const delta = avg ? Number(p.price) - avg : 0;
          const tone = delta > 0 ? 'up' : delta < 0 ? 'down' : 'flat';
          return (
            <div className="card price-card" key={p._id}>
              <p className="site-chip">{p.market}</p>
              <h3>{p.fish}</h3>
              <p className="price">Rs. {Number(p.price).toLocaleString('en-LK')} <small>/kg</small></p>
              <p className={`delta ${tone}`}>
                {delta === 0 && 'In line with the current average'}
                {delta > 0 && `Rs. ${delta.toLocaleString('en-LK')} above this view’s average`}
                {delta < 0 && `Rs. ${Math.abs(delta).toLocaleString('en-LK')} below this view’s average`}
              </p>
              <div className="card-meta">
                <span>{p.date}</span>
                <span>Reported by {p.seller}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
