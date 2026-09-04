import { Link, NavLink } from 'react-router-dom';

const LINKS = [
  { to: '/', label: 'Home', end: true },
  { to: '/prices', label: "Today's Prices" },
  { to: '/add', label: 'Report Price' }
];

export default function Navbar({ landingSites, entryCount }) {
  return (
    <>
      <div className="topstrip">
        <div className="shell">
          <span className="live">● Community reported</span>
          <span>{landingSites} landing sites · {entryCount} entries</span>
        </div>
      </div>
      <nav className="nav" aria-label="Primary navigation">
        <div className="shell">
          <Link to="/" className="brand">
            <img src="/logo.png" alt="" width="32" height="32" />
            Negombo Fish Price Board
          </Link>
          <div className="nav-links">
            {LINKS.map(link => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.end}
                className={({ isActive }) => (isActive ? 'active' : undefined)}
              >
                {link.label}
              </NavLink>
            ))}
          </div>
        </div>
      </nav>
    </>
  );
}
