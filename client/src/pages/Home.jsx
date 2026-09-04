import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="page">
      <header className="hero">
        <p className="eyebrow">Negombo landing sites · 4 September 2026</p>
        <h1>Negombo Fish Price Board</h1>
        <p className="muted hero-lead">
          Today's fish prices across Negombo landing sites, reported by the people who are there.
        </p>
        <div className="hero-actions">
          <Link className="btn" to="/prices">
            See today's prices
          </Link>
          <Link className="btn btn-ghost" to="/add">
            Report a price
          </Link>
        </div>
      </header>

      <section className="card">
        <h2>The Problem</h2>
        <p>
          Small-boat fishermen in Negombo land their catch before dawn and must sell it immediately,
          because there is no cold storage and the fish loses value by the hour. At the moment of sale
          they have no way to know what the same fish is fetching at nearby landing sites such as Duwa
          or Pitipana. The buyer quotes a price and the fisherman has no reference to argue against it,
          so the same Balaya can sell for Rs. 880 at one site and Rs. 950 at another on the same
          morning. Across a season this gap is a meaningful loss of income for families who depend
          entirely on the day's catch.
        </p>
      </section>

      <section className="card">
        <h2>Our Solution</h2>
        <p>
          A shared price board. Any fisherman or buyer records today's price for a fish type at their
          landing site, and anyone can search and filter to see what that fish is selling for elsewhere
          in Negombo — with the live average — before agreeing a price.
        </p>
      </section>

      <section className="card">
        <h2>Who It Helps</h2>
        <p>
          Small-boat fishermen and small-scale buyers at Negombo Main, Duwa Landing and Pitipana. A
          fisherman who can quote the going rate at the next landing site is negotiating with
          information instead of guessing.
        </p>
      </section>
    </div>
  );
}
