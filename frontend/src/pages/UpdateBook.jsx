import React from 'react'
import {useState, useEffect} from 'react'
import axios from 'axios'
import {useNavigate, useParams} from 'react-router-dom'

const Update= () => {
    const [book,setBook] = useState({
        category_id: 1,
        title:"",
        author:"",
        description:"",
    });

    const navigate = useNavigate()

    const {id} = useParams()

    useEffect(() => {
        const fetchBook = async () => {
            try {
                const res = await axios.get(`http://localhost:8081/books/${id}`);
                setBook(res.data); 
            } catch (error) {
                console.error("Error fetching the book details:", error);
            }
        };

        fetchBook();
    }, [id]);


    const handleChange = (e) => {
        setBook((prev)=>({...prev, [e.target.name]:e.target.value}));
    };

    const handleClick = async e => {
        e.preventDefault()
        try{
            await axios.put(`http://localhost:8081/books/${id}`, book)
            navigate("/")
        }
        catch(error)
        {
            console.log(error)
        }
    }

    return (
        <div>
        <h1>Update the book!</h1>
        <input type = "number" placeholder="category_id" value={book.category_id} onChange={handleChange} name="category_id"/>
        <input type = "text" placeholder='title' value = {book.title} onChange={handleChange} name="title"/>
        <input type = "text" placeholder='author' value = {book.author} onChange={handleChange} name="author"/>
        <input type = "text" placeholder='description' value = {book.description} onChange={handleChange} name="description"/>
        <button className="formButton" onClick = {handleClick}>Update</button>
        </div>
    );
}

export default Update