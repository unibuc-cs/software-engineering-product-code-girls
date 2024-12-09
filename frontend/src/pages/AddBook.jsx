import React from 'react'
import {useState} from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

const Add = () => {
    const [book,setBook] = useState({
        category_id: 1,
        title:"",
        author:"",
        description:"",
    });

    const navigate = useNavigate()

    const handleChange = (e) => {
        setBook((prev)=>({...prev, [e.target.name]:e.target.value}));
    };

    const handleClick = async e => {
        e.preventDefault()
        try{
            await axios.post("http://localhost:8081/books", book)
            navigate("/")
        }
        catch(error)
        {
            console.log(error)
        }
    }

    return (
        <div>
        <h1>Add a new book!</h1>
        <input type = "number" placeholder="category_id" onChange={handleChange} name="category_id"/>
        <input type = "text" placeholder='title' onChange={handleChange} name="title"/>
        <input type = "text" placeholder='author' onChange={handleChange} name="author"/>
        <input type = "text" placeholder='description' onChange={handleChange} name="description"/>
        <button onClick = {handleClick}>Add book</button>
        </div>
    );
}

export default Add