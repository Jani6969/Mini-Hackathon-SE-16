import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <main className="page">
      <p className="eyebrow">Error 404</p>
      <h1>That page does not exist.</h1>
      <p className="lede">The link may be out of date. The price board is still here.</p>
      <div className="hero-actions">
        <Link className="btn btn-primary" to="/">Back to home</Link>
        <Link className="btn btn-ghost" to="/prices">View today&apos;s prices</Link>
      </div>
    </main>
  );
}
