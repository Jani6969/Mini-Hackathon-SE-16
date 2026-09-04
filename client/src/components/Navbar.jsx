import { NavLink } from 'react-router-dom';

export default function Navbar({ offline = false }) {
  return (
    <nav className="nav">
      <span className="brand">Negombo Price Board</span>
      <div className="nav-links">
        <NavLink to="/" end>
          Home
        </NavLink>
        <NavLink to="/prices">Prices</NavLink>
        <NavLink to="/add">Report Price</NavLink>
      </div>
      {offline && <span className="offline-pill">Showing sample data</span>}
    </nav>
  );
}
