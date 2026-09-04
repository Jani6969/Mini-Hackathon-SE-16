import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="nav" aria-label="Primary navigation">
      <span className="brand">🐟 Negombo Price Board</span>
      <div>
        <Link to="/">Home</Link>
        <Link to="/prices">Prices</Link>
        <Link to="/add">Report Price</Link>
      </div>
    </nav>
  );
}
