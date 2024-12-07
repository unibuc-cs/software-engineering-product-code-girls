import React from 'react'
import axios from 'axios'
import {useState, useEffect} from 'react'

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


    return (
        <><h1>Books</h1><div className="books">
            {books.map(book => (
                <div className="book" key={book.id}>
                    <br></br>
                    <h2>{book.title}</h2>
                    <h2>{book.author}</h2>
                    <p>{book.description}</p>
                    <br></br>
                </div>
            ))}
        </div></>
    )
}

export default Books