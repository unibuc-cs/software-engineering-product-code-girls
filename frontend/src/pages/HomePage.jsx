import { logout } from '../auth/authService';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <>
      <div className="title">GoodReadsApp</div>
      <div className="subtitle">Browse, review, add comments and save all your favorite books.</div>
    </>
  );
};

export default HomePage;
