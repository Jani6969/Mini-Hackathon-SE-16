export default function Home() {
  return (
    <main className="page">
      <h1>Negombo Fish Price Board</h1>
      <p className="muted">Recent community-reported fish prices across selected Negombo landing sites.</p>
      <section className="card">
        <h2>The Problem</h2>
        <p>
          Small-scale fishermen and buyers around Negombo often need to make quick selling and buying decisions.
          Price information from nearby landing sites is not always available in one shared place when it is needed.
          A fisherman at Negombo Main may want to compare the reported price for the same fish at Duwa Landing or
          Pitipana before agreeing to a sale.
        </p>
      </section>
      <section className="card">
        <h2>Our Solution</h2>
        <p>
          A public community price board where fishermen and buyers can report a fish price for a selected landing
          site, then browse, search and filter recent reports and see the average of current filtered results.
        </p>
      </section>
      <section className="card">
        <h2>Who It Helps</h2>
        <p>
          Small-scale fishermen, buyers and retail sellers using Negombo Main, Duwa Landing and Pitipana who want a
          faster price reference before trading.
        </p>
      </section>
      <section className="notice">
        <strong>Prototype notice:</strong> Prices supplied with this hackathon build are sample/illustrative data and
        are not official market quotations.
      </section>
    </main>
  );
}
