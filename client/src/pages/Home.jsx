import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <main>
      <section className="hero">
        <div className="hero-image" role="img" aria-label="Fresh fish on ice beside Negombo lagoon at sunrise" />
        <div className="hero-overlay" />
        <div className="hero-content">
          <p className="eyebrow"><span /> Community prices · Negombo coast</p>
          <h1>Know today’s catch.<br />Trade with confidence.</h1>
          <p className="hero-copy">A clear, shared view of community-reported fish prices across Negombo Main, Duwa Landing and Pitipana.</p>
          <div className="hero-actions">
            <Link className="button button-primary" to="/prices">Explore live prices</Link>
            <Link className="button button-secondary" to="/add">Report today’s price</Link>
          </div>
        </div>
      </section>
      <div className="page home-page">
        <section className="metric-strip" aria-label="Board coverage">
          <div><strong>3</strong><span>landing sites</span></div>
          <div><strong>7</strong><span>local fish types</span></div>
          <div><strong>Live</strong><span>community reports</span></div>
        </section>
        <section className="section-heading">
          <div><p className="eyebrow dark"><span /> Built for the landing site</p><h2>One useful signal, right when it matters.</h2></div>
          <p>Simple enough to use outdoors, clear enough to support a better conversation before agreeing a sale.</p>
        </section>
        <section className="story-grid">
          <article className="story-card story-card-featured story-market"><span className="story-number">01</span><h3>The price-information gap</h3><p>Small-scale fishermen and buyers often need to make quick decisions without one shared view of nearby reported prices. The same catch can be compared across three selected Negombo landing sites.</p></article>
          <article className="story-card"><span className="story-number">02</span><h3>Report in seconds</h3><p>Select a fish, landing site and price. Friendly validation keeps every report clear and useful.</p></article>
          <article className="story-card"><span className="story-number">03</span><h3>Compare instantly</h3><p>Search and filter recent reports, then use the live average as a practical reference before trading.</p></article>
        </section>
        <section className="landing-sites">
          <div><p className="eyebrow dark"><span /> Local coverage</p><h2>Three landing sites.<br />One shared board.</h2></div>
          <div className="site-list"><span>Negombo Main <b>01</b></span><span>Duwa Landing <b>02</b></span><span>Pitipana <b>03</b></span></div>
        </section>
        <section className="notice" role="note"><span className="notice-icon" aria-hidden="true">i</span><p><strong>Community prototype</strong> Prices shown are sample or community-reported references. They are not official market quotations.</p></section>
      </div>
    </main>
  );
}
