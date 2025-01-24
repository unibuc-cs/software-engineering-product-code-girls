//import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../auth/authService';
import { Link } from 'react-router-dom';
import { useUser } from './UserContext';
import  { useState } from 'react';

const Login = () => {
  const { user, updateUser } = useUser();  // Obții utilizatorul și funcția de actualizare din context
 

  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  const handleChange = (e) => {
    updateUser({ [e.target.name]: e.target.value });
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const response = await login(user);
      
      if (response) {
        console.log('Login Response:', response);
        updateUser({ id: response.id, name: user.name, profile_picture: response.profile_picture });
        navigate("/homepage");
        console.log('User id=' + user.id);
      }
    } catch (error) {
        setErrorMessage(error.response?.data?.message || "An unexpected error occurred!")
    }
  };

  return (
    <div>
      <h1>Login!</h1>
      <input type="text" placeholder="name" onChange={handleChange} name="name" />
      <input type="password" placeholder="password" onChange={handleChange} name="password" />
      <button onClick={handleClick}>Login!</button>
      <button><Link to="/registration">Don`t you already have an account?</Link></button>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
    </div>
  );
};

export default Login;