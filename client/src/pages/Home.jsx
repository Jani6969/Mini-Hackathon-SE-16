import { Link } from 'react-router-dom';

export default function Home({ prices = [] }) {
  const liveCount = prices.length;
  const liveAvg = liveCount
    ? Math.round(prices.reduce((sum, p) => sum + Number(p.price || 0), 0) / liveCount)
    : 0;

  return (
    <div className="page home-page">
      <header className="hero">
        <div className="hero-copy">
          <p className="eyebrow">Negombo coast · live this morning</p>
          <h1>
            Read the tide
            <span>before you sell.</span>
          </h1>
          <p className="hero-lead">
            Today's fish prices across Negombo landing sites, reported by the people who are
            there. No cold storage. No waiting. Just a number you can stand on.
          </p>
          <div className="hero-actions">
            <Link className="btn" to="/prices">
              See today's board
            </Link>
            <Link className="btn btn-ghost" to="/add">
              Report a landing price
            </Link>
          </div>
        </div>

        <aside className="hero-panel">
          <p className="panel-kicker">Same fish. Same morning.</p>
          <div className="compare">
            <div>
              <span>Pitipana</span>
              <strong>Rs. 880</strong>
              <em>Balaya /kg</em>
            </div>
            <div className="compare-gap">Rs. 70 gap</div>
            <div>
              <span>Negombo Main</span>
              <strong>Rs. 950</strong>
              <em>Balaya /kg</em>
            </div>
          </div>
          <p className="panel-note">
            That gap is income walking to the next beach. The board makes it visible.
          </p>
        </aside>
      </header>

      <section className="stat-row">
        <article className="stat">
          <b>{liveCount || '—'}</b>
          <span>Live reports</span>
        </article>
        <article className="stat">
          <b>{liveAvg ? `Rs. ${liveAvg.toLocaleString('en-LK')}` : '—'}</b>
          <span>Board average /kg</span>
        </article>
        <article className="stat">
          <b>3</b>
          <span>Landing sites</span>
        </article>
      </section>

      <section className="story-grid">
        <article className="card story">
          <p className="eyebrow">01 · The problem</p>
          <h2>The Problem</h2>
          <p>
            Small-boat fishermen in Negombo land their catch before dawn and must sell it
            immediately, because there is no cold storage and the fish loses value by the hour. At
            the moment of sale they have no way to know what the same fish is fetching at nearby
            landing sites such as Duwa or Pitipana. The buyer quotes a price and the fisherman has
            no reference to argue against it, so the same Balaya can sell for Rs. 880 at one site
            and Rs. 950 at another on the same morning. Across a season this gap is a meaningful
            loss of income for families who depend entirely on the day's catch.
          </p>
        </article>
        <article className="card story">
          <p className="eyebrow">02 · The board</p>
          <h2>Our Solution</h2>
          <p>
            A shared price board. Any fisherman or buyer records today's price for a fish type at
            their landing site, and anyone can search and filter to see what that fish is selling
            for elsewhere in Negombo — with the live average — before agreeing a price.
          </p>
        </article>
        <article className="card story">
          <p className="eyebrow">03 · Who it helps</p>
          <h2>Who It Helps</h2>
          <p>
            Small-boat fishermen and small-scale buyers at Negombo Main, Duwa Landing and Pitipana.
            A fisherman who can quote the going rate at the next landing site is negotiating with
            information instead of guessing.
          </p>
        </article>
      </section>

      <section className="sites">
        <h2>Landing sites on the board</h2>
        <div className="grid sites-grid">
          <article className="card site-card">
            <h3>Negombo Main</h3>
            <p className="muted">The busiest morning market. Prices move first here.</p>
          </article>
          <article className="card site-card">
            <h3>Duwa Landing</h3>
            <p className="muted">Smaller boats, shorter run to the buyer.</p>
          </article>
          <article className="card site-card">
            <h3>Pitipana</h3>
            <p className="muted">Often a few rupees behind — or ahead — of Main.</p>
          </article>
        </div>
      </section>
    </div>
  );
}
