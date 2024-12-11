import React from 'react'
import {useState} from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import { Link } from 'react-router-dom';

const Login = () => {
    const [user,setUser] = useState({
        name:"",
        password:""
    });

    const [errorMessage, setErrorMessage] = useState("");

    const navigate = useNavigate()

    const handleChange = (e) => {
        setUser((prev)=>({...prev, [e.target.name]:e.target.value}));
    };

    const handleClick = async e => {
        e.preventDefault()
        try{
            const response = await axios.post("http://localhost:8081/users/login", user)
            if (response.data.success){
                navigate("/homepage")
            }
        }
        catch(error)
        {
            if(error.response){
                setErrorMessage(error.response.data.message);
            } else{
                setErrorMessage("An unexpected error occurred!");
            }
        }
    }

    return (
        <div>
        <h1>Login!</h1>
        <input type = "text" placeholder = "name" onChange={handleChange} name="name"/>
        <input type = "password" placeholder = "password" onChange={handleChange} name="password" />
        <button onClick = {handleClick}>Login!</button>
        <button><Link to="/registration">Don't you already have an account?</Link></button>
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
        </div>
    );
}

export default Login