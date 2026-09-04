import { Link } from 'react-router-dom';

const STEPS = [
  {
    title: 'Report what you sold',
    body: 'A fisherman or seller picks the fish, the landing site and the price per kilo, and adds their name.'
  },
  {
    title: 'It reaches the board',
    body: 'The report is saved and appears at the top of the public price list straight away.'
  },
  {
    title: 'Everyone can compare',
    body: 'Buyers and other fishermen search, filter by landing site, and see the current average before agreeing a price.'
  }
];

export default function Home({ prices = [] }) {
  const average = prices.length
    ? Math.round(prices.reduce((total, price) => total + price.price, 0) / prices.length)
    : 0;
  const sites = new Set(prices.map(price => price.market)).size;

  return (
    <main className="page">
      <section className="hero">
        <div>
          <p className="eyebrow">Negombo · Daily landing-site prices</p>
          <h1>
            Fair, transparent fish prices across <span className="accent">Negombo landing sites</span>
          </h1>
          <p className="lede">
            A public board where fishermen and buyers report today&apos;s price per kilo, then compare
            it against other landing sites before agreeing a sale.
          </p>
          <div className="hero-actions">
            <Link className="btn btn-primary" to="/prices">
              View today&apos;s prices
            </Link>
            <Link className="btn btn-ghost" to="/add">
              Report a price
            </Link>
          </div>
        </div>
        <figure className="hero-figure">
          <img src="/hero.jpg" alt="Fresh fish on ice at a Negombo landing site" width="1600" height="900" />
        </figure>
      </section>

      <section className="section">
        <div className="stats">
          <div className="stat">
            <p className="stat-label">Reports on the board</p>
            <p className="stat-value">{prices.length}</p>
          </div>
          <div className="stat">
            <p className="stat-label">Average price</p>
            <p className="stat-value up">Rs. {average} /kg</p>
          </div>
          <div className="stat">
            <p className="stat-label">Landing sites</p>
            <p className="stat-value">{sites}</p>
          </div>
          <div className="stat">
            <p className="stat-label">Cost to use</p>
            <p className="stat-value">Free</p>
          </div>
        </div>
      </section>

      <section className="section">
        <p className="eyebrow">Why this exists</p>
        <h2>The problem</h2>
        <div className="card-list">
          <div className="info-card">
            <h3>Prices are scattered</h3>
            <p>
              Small-scale fishermen and buyers around Negombo often need to make quick selling and
              buying decisions. Price information from nearby landing sites is not always available in
              one shared place when it is needed.
            </p>
          </div>
          <div className="info-card">
            <h3>No time to shop around</h3>
            <p>
              A fisherman at Negombo Main may want to compare the reported price for the same fish at
              Duwa Landing or Pitipana before agreeing to a sale — but the boat is unloading now.
            </p>
          </div>
          <div className="info-card">
            <h3>Our solution</h3>
            <p>
              A public community price board where anyone can report a fish price for a landing site,
              then browse, search and filter recent reports and see the average of the current
              results.
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <p className="eyebrow">How it works</p>
        <h2>Three steps, no account needed</h2>
        <div className="card-list">
          {STEPS.map((step, index) => (
            <div className="info-card" key={step.title}>
              <span className="step-number">{String(index + 1).padStart(2, '0')}</span>
              <h3>{step.title}</h3>
              <p>{step.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <p className="eyebrow">Who it helps</p>
        <h2>Built for the dock, not the desk</h2>
        <p className="lede">
          Small-scale fishermen, buyers and retail sellers using Negombo Main, Duwa Landing and
          Pitipana who want a faster price reference before trading.
        </p>
      </section>

      <section className="notice">
        <strong>Prototype notice:</strong> Prices supplied with this hackathon build are
        sample/illustrative data and are not official market quotations.
      </section>
    </main>
  );
}
