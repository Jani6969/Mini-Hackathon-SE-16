import { Link } from 'react-router-dom';

const LANDING_SITES = ['Negombo Main', 'Duwa Landing', 'Pitipana'];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="shell">
        <div className="footer-grid">
          <div>
            <h4>Negombo Board</h4>
            <p className="muted">
              A public price board for small-scale fishermen and buyers. Community reported, open to
              everyone, free to read.
            </p>
          </div>
          <div>
            <h4>Landing sites</h4>
            <ul>
              {LANDING_SITES.map(site => (
                <li key={site}>{site}</li>
              ))}
            </ul>
          </div>
          <div>
            <h4>Pages</h4>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/prices">Today&apos;s Prices</Link></li>
              <li><Link to="/add">Report a Price</Link></li>
            </ul>
          </div>
          <div>
            <h4>Prototype notice</h4>
            <p className="muted">
              Sample prices are illustrative only and are not official or verified market
              quotations.
            </p>
          </div>
        </div>
        <div className="footer-base">
          © 2026 Negombo Fish Price Board · SLIIT SE3090 Mini Hackathon · Group SE_016
        </div>
      </div>
    </footer>
  );
}
