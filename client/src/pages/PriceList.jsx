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
  const lowest = filtered.length ? Math.min(...filtered.map(price => price.price)) : 0;
  const highest = filtered.length ? Math.max(...filtered.map(price => price.price)) : 0;

  if (loading) return <main className="page loading-state"><span className="loader" /><p>Loading latest prices…</p></main>;

  return (
    <main className="page dashboard-page">
      <div className="page-intro prices-intro"><div><p className="eyebrow dark"><span /> Live community board</p><h1>Today&apos;s prices</h1><p>Compare recent reports from selected landing sites around Negombo.</p></div><span className="live-badge"><i /> Live data</span></div>
      <section className="dashboard-metrics" aria-label="Filtered price summary">
        <article><span>Reports</span><strong>{filtered.length}</strong><small>matching entries</small></article>
        <article className="metric-primary"><span>Average price</span><strong><small>Rs.</small> {average}</strong><small>per kilogram</small></article>
        <article><span>Lowest report</span><strong><small>Rs.</small> {lowest}</strong><small>per kilogram</small></article>
        <article><span>Highest report</span><strong><small>Rs.</small> {highest}</strong><small>per kilogram</small></article>
      </section>
      <div className="dashboard-layout">
        <aside className="filter-panel" aria-label="Price filters">
          <div className="filter-heading"><div><span>Refine board</span><strong>Filters</strong></div>{(search || market !== 'All') && <button className="reset-filter" type="button" onClick={() => { setSearch(''); setMarket('All'); }}>Reset</button>}</div>
          <label htmlFor="search">Fish name</label>
          <input id="search" placeholder="Search fish type..." value={search} onChange={event => setSearch(event.target.value)} />
          <label htmlFor="market-filter">Landing site</label>
          <select id="market-filter" value={market} onChange={event => setMarket(event.target.value)}>
            {markets.map(option => <option key={option} value={option}>{option}</option>)}
          </select>
          <div className="filter-note"><span>i</span><p>Average and price range update instantly with your filters.</p></div>
        </aside>
        <section className="dashboard-results" aria-label="Price reports">
          <div className="results-heading"><div><strong>Latest reports</strong><span>{filtered.length} {filtered.length === 1 ? 'result' : 'results'}</span></div><span className="sort-label">Newest first</span></div>
          {filtered.length === 0 && <div className="empty-state"><strong>No matching prices</strong><p>Try another fish name or landing site.</p></div>}
          <div className="grid">
            {filtered.map(price => (
              <article className="price-card" key={price._id}>
                <div className="price-card-top"><span className="market-chip">{price.market}</span><time dateTime={price.date}>{price.date}</time></div>
                <h2>{price.fish}</h2>
                <p className="price"><small>Rs.</small> {price.price}<span>/kg</span></p>
                <div className="reporter"><span>{price.seller.charAt(0).toUpperCase()}</span> Reported by {price.seller}</div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
