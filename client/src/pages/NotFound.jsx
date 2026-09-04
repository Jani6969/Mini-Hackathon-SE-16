import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="page">
      <div className="card not-found">
        <p className="eyebrow">Page missing</p>
        <h1>404</h1>
        <p>That page does not exist.</p>
        <Link className="btn" to="/">
          Back to home
        </Link>
      </div>
    </div>
  );
}
