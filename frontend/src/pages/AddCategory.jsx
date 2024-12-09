import React from 'react'
import {useState} from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

const Add = () => {
    const [category,setCategory] = useState({
        name: ""
    });

    const navigate = useNavigate()

    const handleChange = (e) => {
        setCategory((prev)=>({...prev, [e.target.name]:e.target.value}));
    };

    const handleClick = async e => {
        e.preventDefault()
        try{
            await axios.post("http://localhost:8081/categories", category)
            navigate("/")
        }
        catch(error)
        {
            console.log(error)
        }
    }

    return (
        <div>
        <h1>Add a new category!</h1>
        <input type = "text" placeholder="name" onChange={handleChange} name="name"/>
        <button onClick = {handleClick}>Add category!</button>
        </div>
    );
}

export default Add