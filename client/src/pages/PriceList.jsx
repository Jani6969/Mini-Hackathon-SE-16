import { useState } from 'react';

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

  if (loading) return <main className="page"><p>Loading prices...</p></main>;

  return (
    <main className="page">
      <h1>Today&apos;s Prices</h1>
      <div className="filters">
        <label className="visually-hidden" htmlFor="search">Search fish type</label>
        <input id="search" placeholder="Search fish type..." value={search}
          onChange={event => setSearch(event.target.value)} />
        <label className="visually-hidden" htmlFor="market-filter">Filter by landing site</label>
        <select id="market-filter" value={market} onChange={event => setMarket(event.target.value)}>
          {markets.map(option => <option key={option} value={option}>{option}</option>)}
        </select>
      </div>
      <p className="summary">
        Showing <b>{filtered.length}</b> {filtered.length === 1 ? 'entry' : 'entries'}
        {' · '}Average price <b>Rs. {average}</b> /kg
      </p>
      {filtered.length === 0 && <p className="muted">No prices found for that search.</p>}
      <div className="grid">
        {filtered.map(price => (
          <article className="card" key={price._id}>
            <h2>{price.fish}</h2>
            <p className="price">Rs. {price.price} /kg</p>
            <p>{price.market} · {price.date}</p>
            <p className="muted">Reported by {price.seller}</p>
          </article>
        ))}
      </div>
    </main>
  );
}
