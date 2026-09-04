import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <main className="page not-found">
      <p className="eyebrow dark"><span /> Lost at sea</p>
      <h1>404</h1>
      <p>That page does not exist.</p>
      <Link className="button button-primary" to="/">Back to home</Link>
    </main>
  );
}
