import { useState } from 'react';
import { Link } from 'react-router-dom';
import PriceCard from '../components/PriceCard.jsx';

export default function PriceList({ prices, loading }) {
  const [search, setSearch] = useState('');
  const [market, setMarket] = useState('All');
  const markets = ['All', ...new Set(prices.map(price => price.market))];
  const filtered = prices.filter(price =>
    price.fish.toLowerCase().includes(search.toLowerCase()) &&
    (market === 'All' || price.market === market)
  );
  const average = filtered.length
    ? Math.round(filtered.reduce((total, price) => total + price.price, 0) / filtered.length)
    : 0;
  const lowest = filtered.length ? Math.min(...filtered.map(price => price.price)) : 0;
  const highest = filtered.length ? Math.max(...filtered.map(price => price.price)) : 0;

  if (loading) {
    return (
      <main className="page">
        <p className="eyebrow">Loading</p>
        <h1>Today&apos;s Catch</h1>
        <p>Loading prices...</p>
      </main>
    );
  }

  return (
    <main className="page">
      <p className="eyebrow">Live community board</p>
      <h1>Today&apos;s Catch &amp; Dockside Prices</h1>
      <p className="lede">
        Prices per kilo, reported by fishermen and sellers at the landing site. Search a fish or
        filter by site to compare.
      </p>

      <div className="section">
        <div className="filters">
          <label className="visually-hidden" htmlFor="search">Search fish type</label>
          <input
            id="search"
            placeholder="Search fish type..."
            value={search}
            onChange={event => setSearch(event.target.value)}
          />
          <label className="visually-hidden" htmlFor="market-filter">Filter by landing site</label>
          <select
            id="market-filter"
            value={market}
            onChange={event => setMarket(event.target.value)}
          >
            {markets.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>

        <div className="stats">
          <div className="stat">
            <p className="stat-label">Showing</p>
            <p className="stat-value">
              {filtered.length} {filtered.length === 1 ? 'entry' : 'entries'}
            </p>
          </div>
          <div className="stat">
            <p className="stat-label">Average price</p>
            <p className="stat-value up">Rs. {average} /kg</p>
          </div>
          <div className="stat">
            <p className="stat-label">Lowest</p>
            <p className="stat-value">Rs. {lowest} /kg</p>
          </div>
          <div className="stat">
            <p className="stat-label">Highest</p>
            <p className="stat-value">Rs. {highest} /kg</p>
          </div>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="panel">
          <h3>No prices found for that search.</h3>
          <p className="muted">
            Try a different fish name, or clear the landing-site filter.
          </p>
        </div>
      ) : (
        <div className="price-grid">
          {filtered.map(price => (
            <PriceCard key={price._id} price={price} />
          ))}
        </div>
      )}

      <section className="panel section" style={{ marginTop: '32px' }}>
        <div className="panel-head">
          <h3>Have today&apos;s prices from your boat or stall?</h3>
          <Link className="btn btn-primary" to="/add">Report a price</Link>
        </div>
        <p className="muted">
          Anyone can report. No account, no login — the board is public to read and to write.
        </p>
      </section>
    </main>
  );
}
