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
    });
    const { user } = useUser();

    const { id } = useParams();  

    useEffect(() => {
        const fetchBook = async () => {
            try {
                const res = await axios.get(`http://localhost:8081/books/${id}`);
                setBook(res.data); 
                localStorage.setItem('bookId', res.data.id); // Correct reference to res.data.id
                console.log('Your book id is '+book.id);
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
            const verif = await axios.get(`http://localhost:8081/library/${user.id}/${id}`);
            console.log('Verif: ',verif);

            const response = await axios.post(`http://localhost:8081/library/add`, {
                user_id: user.id,
                book_id: id,
            });
    
            const message = response?.data?.message || 'The book was added to your library!';
            alert(message);
        } catch (error) {
            if(error.response.status == 400 || error.response.status == 404) {
                alert('The book is already in your library.');
                return;
            }
            if (error.response) {
                console.error('Server responded with an error:', error.response.status, error.response.data);
                alert(error.response.data.message || 'An error occurred!');

            } else if (error.request) {
                console.error('No response from server:', error.request);
                alert('The server is not responding. Please try again later.');
                
            } else {
                console.error('Error in request setup:', error.message);
                alert('An unexpected error occurred. Please try again.');
            }
        }
    };
    

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

            <button onClick={handleClick}>Add to your personal library</button>
        </div>
    );
};

export default Show;
