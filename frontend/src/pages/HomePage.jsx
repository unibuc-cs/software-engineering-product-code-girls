import React from 'react'
import { Link } from 'react-router-dom';
import { logout } from '../auth/authService';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
    
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
      };

    return (
        <><h1>GoodReadsApp</h1>
                <div className="meniu">
                    <button className="toCategories"><Link to = {`/categories`}>Categories</Link></button>
                    <button className="toBooks"><Link to = {`/books`}>Books</Link></button>
                    <button onClick={handleLogout}>Logout</button>
                </div>
        </>
    )
}

export default HomePage