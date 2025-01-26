import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Books = () => {
    const [books, setBooks] = useState([]);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        const fetchUserRole = async () => {
            const token = localStorage.getItem('accessToken');
            if (!token) {
                console.error('No token found. Please log in.');
                return;
            }
            try {
                const res = await axios.get("http://localhost:8081/userrole", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (res.data.role === 1) {
                    setIsAdmin(true);
                }
            } catch (error) {
                console.error("Error fetching user role:", error);
            }
        };
        fetchUserRole();
    }, []);

    useEffect(() => {
        const fetchAllBooks = async () => {
            try {
                const res = await axios.get("http://localhost:8081/books");
                setBooks(res.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchAllBooks();
    }, []);

    const handleDelete = async (id) => {
        try {
            const token = localStorage.getItem("accessToken");
            if (!token) {
                console.error("No token found. Please log in.");
                return;
            }

            await axios.delete(`http://localhost:8081/books/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            window.location.reload();
        } catch (error) {
            console.error("Error deleting book:", error);
        }
    };

    return (
        <>
            <h1>Books</h1>
            <br />
            <div className="items-container">
                {books.map(book => (
                    <div className="item-box" key={book.id}>
                        {book.cover_image && (
                            <img src={book.cover_image} alt={book.title} style={{ maxWidth: "250px", height: "auto" }} />
                        )}
                        <h2>{book.title}</h2>
                        <h3>{book.author}</h3>
                        <p>{book.description}</p>
                        {isAdmin && (
                            <>
                                <button className="delete" onClick={() => { handleDelete(book.id) }}>Delete</button>
                                <button className="update"><Link to={`/books/update/${book.id}`}>Update</Link></button>
                            </>
                        )}
                        <button className="details"><Link to={`/books/${book.id}`}>Details</Link></button>
                    </div>
                ))}
            </div>
            {isAdmin && (
                <button style={{marginTop:"35px"}}><Link to="/books/add" style={{fontSize: "large"}}>Add new book</Link></button>
            )}
            <div style={{padding: "20px"}}></div>
        </>
    );
};

export default Books;
