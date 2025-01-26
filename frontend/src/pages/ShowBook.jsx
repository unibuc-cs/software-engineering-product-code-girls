import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { useUser } from './UserContext';

const Show = () => {
    const [book, setBook] = useState({
        category_id: 1,
        title: "",
        author: "",
        description: "",
        cover_image: "",
    });
    const { user } = useUser();
    const { id } = useParams();

    useEffect(() => {
        const fetchBook = async () => {
            try {
                const res = await axios.get(`http://localhost:8081/books/${id}`);
                setBook(res.data);
                localStorage.setItem('bookId', res.data.id);
                console.log('Your book id is ' + book.id);
            } catch (error) {
                console.error("Error fetching the book details:", error);
            }
        };

        fetchBook();
    }, [id]);

    const handleClick = async (e) => {
        e.preventDefault();

        if (!user?.id || !id) {
            alert('Invalid user or book data. Please try again.');
            console.error('Invalid data:', { userId: user?.id, bookId: id });
            return;
        }

        try {
            console.log('User id:', user.id);
            console.log('Book id:', id);
            await axios.get(`http://localhost:8081/library/${user.id}/${id}`);
            alert('The book is already in your library.');
        } catch (error) {
            if (error.response.status === 450) {
                try {
                    console.log('User id:', user.id);
                    console.log('Book id:', id);
                    const response = await axios.post(`http://localhost:8081/library/add`, {
                        user_id: user.id,
                        book_id: id,
                    });

                    const message = response?.data?.message || 'The book was added to your library!';
                    alert(message);
                } catch (error) {
                    console.error('Error adding the book to the library:', error);
                    alert('An error occurred while adding the book to your library. Please try again.');
                }
            } else {
                console.error('Error in request setup:', error.status, error.message);
                alert('An unexpected error occurred. Please try again.');
            }
        }
    };

    return (
        <div>
        <div className="item-box" style={{marginLeft: "300px", marginRight:"300px",
                                          marginTop: "50px", marginBottom:"50px"
}}>
            {book.cover_image && (
                <div>
                    <img
                        src={book.cover_image}
                        alt={`${book.title} cover`}
                        style={{ maxWidth: "300px", height: "auto", marginBottom: "20px" }}
                    />
                </div>
            )}
            <p><strong>Category ID:</strong> {book.category_id}</p>
            <p><strong>Title:</strong> {book.title}</p>
            <p><strong>Author:</strong> {book.author}</p>
            <p><strong>Description:</strong> {book.description}</p>

            <div className="buttons-container">
                <button className="button-link">
                    <Link to={`/reviews/${id}`}>Show all reviews</Link>
                </button>
                <button className="button-link">
                    <Link to={`/comments/${id}`}>Show all comments</Link>
                </button>
                <button className="button-link">
                    <Link to={`/reviews/add`}>Add a review</Link>
                </button>
                <button className="button-link">
                    <Link to={`/comments/add`}>Add a comment</Link>
                </button>
            </div>
           </div>
           <button className="primary-button" onClick={handleClick}>Add to your personal library</button>
           <div style={{padding:"20px"}}></div>
        </div>
    );
};

export default Show;
