import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Show = () => {
    const [category, setCategory] = useState({
        name: ""
    });

    const [books, setBooks] = useState([]);

    const { id } = useParams();

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
            <div className="items-container">
                {books.length > 0 ? (
                    books.map(book => (
                        <div className="item-box" key={book.id}>
                            {book.cover_image && (
                                <img
                                    src={book.cover_image}
                                    alt={book.title}
                                    style={{ maxWidth: "250px", height: "auto", marginBottom: "15px" }}
                                />
                            )}
                            <h2>{book.title}</h2>
                            <h3>{book.author}</h3>
                            <p>{book.description}</p>
                        </div>
                    ))
                ) : (
                    <p>No books available for this category.</p>
                )}
            </div>
        </div>
    );
};

export default Show;
