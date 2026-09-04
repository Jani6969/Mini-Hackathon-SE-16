import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <main className="page">
      <h1>404</h1>
      <p>That page does not exist.</p>
      <Link to="/">Back to home</Link>
    </main>
  );
}
