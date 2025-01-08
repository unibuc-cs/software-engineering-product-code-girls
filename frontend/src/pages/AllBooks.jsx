import React from 'react'
import axios from 'axios'
import {useState, useEffect} from 'react'
import { Link } from 'react-router-dom';

const Books = () => {
    const [books, setBooks] = useState([])

    useEffect(()=>{
        const fetchAllBooks = async () => {
            try{
                const res = await axios.get("http://localhost:8081/books")
                setBooks(res.data)
            }
            catch(error){
                console.log(error)
            }
        }
        fetchAllBooks()
    }, [])

    const handleDelete = async (id) => {
        try{
            await axios.delete("http://localhost:8081/books/"+id)
            window.location.reload()
        }catch(error){
            console.log(error)
        }
    }


    return (
        <><h1>Books</h1>
        <br></br>
                <div className="books">
            {books.map(book => (
                <div className="book" key={book.id}>
                    <br></br>
                    <h2>{book.category_id}</h2>
                    <h2>{book.title}</h2>
                    <h2>{book.author}</h2>
                    <p>{book.description}</p>
                    <button className="delete" onClick = {()=>{handleDelete(book.id)}} >Delete</button>
                    <button className="update"><Link to = {`/books/update/${book.id}`}>Update</Link></button>
                    <button className="details"><Link to = {`/books/${book.id}`}>Details</Link></button>
                    <br></br>
                </div>
            ))}
        </div>
        <button><Link to="/books/add">Add new book</Link></button>
        </>
    )
}

export default Books