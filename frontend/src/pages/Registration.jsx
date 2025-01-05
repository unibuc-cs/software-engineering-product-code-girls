//import React from 'react'
import {useState} from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import {useUser} from './UserContext'
import { login } from '../auth/authService';

const Add = () => {
    const { user, updateUser } = useUser();
    const [error,setError] = useState("");

    const navigate = useNavigate()

    const handleChange = (e) => {
        updateUser({ [e.target.name]: e.target.value });
    };

    const handleClick = async e => {
        e.preventDefault()

        try{
            if(user.name&&user.password){
               
                await axios.post("http://localhost:8081/users/register", user)
                const response = await login(user);
                updateUser({ id: response.id, name: user.name, profile_picture: response.profile_picture });
                navigate("/homepage")
                console.log('Login Response:', response);
            }
            else{
                setError("Fields cannot be empty!");
            }
        }
        catch(error)
        {
            setError(error.response?.data?.message || "An unexpected error occurred!")
            
        }
    }

    return (
        <div>
        <h1>Create your own account!</h1>
        <input type = "text" placeholder = "name" onChange={handleChange} name="name"/>
        <input type = "password" placeholder = "password" onChange={handleChange} name="password" />
        <button onClick = {handleClick}>Create account!</button>
        {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
    );
}

export default Add