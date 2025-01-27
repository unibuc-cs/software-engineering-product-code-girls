import { Link } from 'react-router-dom';
import { logout } from '../auth/authService';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar">
        {/* Navbar - partea stângă */}
        <div className="navbar-left">
          <Link to="/categories" className="nav-link">Categories</Link>
          <Link to="/books" className="nav-link">Books</Link>
        </div>

        {/* Navbar - partea dreaptă */}
        <div className="navbar-right">
          <Link to="/profile" className="nav-link">Profile</Link>
          <Link 
            to="#" 
            className="nav-link" 
            onClick={(e) => {
              e.preventDefault(); 
              handleLogout(); 
            }}
          >
            Logout
          </Link>
        </div>
      </nav>
  );
};

export default Navbar;
