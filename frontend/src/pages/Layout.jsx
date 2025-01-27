import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';

const Layout = () => {
  const location = useLocation();

  // Verificăm dacă ruta curentă este `/login` și excludem navbar-ul
  const showNavbar = location.pathname !== '/login';

  return (
    <>
      {showNavbar && <Navbar />}
      <Outlet />
    </>
  );
};

export default Layout;
