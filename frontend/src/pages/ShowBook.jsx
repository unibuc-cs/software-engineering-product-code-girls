import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const Show = () => {
    const [book, setBook] = useState({
        category_id: 1,
        title: "",
        author: "",
        description: "",
    });

    const { id } = useParams();  

    useEffect(() => {
        const fetchBook = async () => {
            try {
                const res = await axios.get(`http://localhost:8081/books/${id}`);
                setBook(res.data); 
                localStorage.setItem('bookId', res.data.id); // Correct reference to res.data.id
            } catch (error) {
                console.error("Error fetching the book details:", error);
            }
        };

        fetchBook();
    }, [id]);

    return (
        <div>
            <h1>{book.category_id}</h1>
            <p><strong>Title:</strong> {book.title}</p>
            <p><strong>Author:</strong> {book.author}</p>
            <p><strong>Description:</strong> {book.description}</p>

            <div className="meniu">
                <button className="toBooks">
                    <Link to={`/reviews/${id}`}>Show all reviews</Link>
                </button>
                <button className="toBooks">
                    <Link to={`/comments/${id}`}>Show all comments</Link>
                </button>

                <button className="toBooks">
                    <Link to={`/reviews/add`}>Add a review</Link>
                </button>
                <button className="toBooks">
                    <Link to={`/comments/add`}>Add a comment</Link>
                </button>
            </div>
        </div>
    );
};

export default Show;
