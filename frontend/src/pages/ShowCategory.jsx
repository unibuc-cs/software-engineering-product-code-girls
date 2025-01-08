import React from 'react'
import {useState, useEffect} from 'react'
import axios from 'axios'
import {useParams} from 'react-router-dom'

const Show= () => {
    const [category,setCategory] = useState({
        name: ""
    });

    const [books, setBooks] = useState([]); 

    const {id} = useParams()

    useEffect(() => {
        const fetchCategory = async () => {
            try {
                const res = await axios.get(`http://localhost:8081/categories/${id}`);
                setCategory(res.data); 
            } catch (error) {
                console.error("Error fetching the category details:", error);
            }
        };

        const fetchBooks = async () => {
            try {
                const res = await axios.get("http://localhost:8081/books"); 
                const filteredBooks = res.data.filter(book => book.category_id === parseInt(id));
                setBooks(filteredBooks);
            } catch (error) {
                console.error("Error fetching the books:", error);
            }
        };

        fetchCategory();
        fetchBooks();
    }, [id]);


    return (
        <div>
        <h1>{category.name}</h1>
        <ul>
                {books.length > 0 ? (
                    books.map(book => (
                        <li key={book.id}>
                            <h3>{book.title}</h3>
                            <p>{book.author}</p>
                        </li>
                    ))
                ) : (
                    <p>No books available for this category.</p>
                )}
            </ul>
        </div>
    );
}

export default Show