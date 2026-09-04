import { NavLink, Link } from 'react-router-dom';

export default function Navbar({ offline = false }) {
  return (
    <nav className="nav">
      <Link to="/" className="brand">
        <span className="brand-mark" aria-hidden="true" />
        <span>
          <strong>Negombo</strong>
          <em>Price Board</em>
        </span>
      </Link>
      <div className="nav-links">
        <NavLink to="/" end>
          Home
        </NavLink>
        <NavLink to="/prices">Prices</NavLink>
        <NavLink to="/add" className="nav-cta">
          Report Price
        </NavLink>
      </div>
      {offline && <span className="offline-pill">Sample tide</span>}
    </nav>
  );
}
