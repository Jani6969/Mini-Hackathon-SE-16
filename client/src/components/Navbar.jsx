import { NavLink } from 'react-router-dom';

export default function Navbar() {
  return (
    <header className="site-header">
      <nav className="nav" aria-label="Primary navigation">
        <NavLink className="brand" to="/" aria-label="Negombo Fish Price Board home">
          <img className="brand-mark" src="/images/stitch-logo-mark.jpg" alt="" />
          <span>Negombo <b>Fish Board</b></span>
        </NavLink>
        <div className="nav-links">
          <NavLink to="/" end>Home</NavLink>
          <NavLink to="/prices">Dashboard</NavLink>
          <NavLink className="nav-cta" to="/add">Report price</NavLink>
        </div>
      </nav>
    </header>
  );
}
