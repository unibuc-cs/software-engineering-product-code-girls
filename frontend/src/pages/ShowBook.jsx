import React from 'react'
import {useState, useEffect} from 'react'
import axios from 'axios'
import {useParams} from 'react-router-dom'

const Show= () => {
    const [book,setBook] = useState({
        category_id: 1,
        title:"",
        author:"",
        description:"",
    });

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


    return (
        <div>
        <h1>{book.category_id}</h1>
        <p>{book.title}</p>
        <p>{book.author}</p>
        <p>{book.description}</p>
        </div>
    );
}

export default Show