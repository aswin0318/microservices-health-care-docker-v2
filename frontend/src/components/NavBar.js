import { Link, useNavigate } from 'react-router-dom';
import './NavBar.css';

function NavBar({ isAuthenticated, user, onLogout }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          🏥 Healthcare System
        </Link>
        <ul className="nav-menu">
          <li className="nav-item">
            <Link to="/" className="nav-link">Home</Link>
          </li>
          <li className="nav-item">
            <Link to="/doctors" className="nav-link">Doctors</Link>
          </li>
          {isAuthenticated && (
            <>
              <li className="nav-item">
                <Link to="/appointments" className="nav-link">Appointments</Link>
              </li>
              <li className="nav-item">
                <span className="nav-user">👤 {user?.name || user?.email || 'User'}</span>
              </li>
              <li className="nav-item">
                <button onClick={handleLogout} className="logout-btn">Logout</button>
              </li>
            </>
          )}
          {!isAuthenticated && (
            <>
              <li className="nav-item">
                <Link to="/register" className="nav-link">Register</Link>
              </li>
              <li className="nav-item">
                <Link to="/login" className="nav-link login-link">Login</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;
