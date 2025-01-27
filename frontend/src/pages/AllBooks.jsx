import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Books = () => {
    const [books, setBooks] = useState([]);
    const [filteredBooks, setFilteredBooks] = useState([]); 
    const [searchTerm, setSearchTerm] = useState(""); 
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
                setFilteredBooks(res.data); 
            } catch (error) {
                console.log(error);
            }
        };
        fetchAllBooks();
    }, []);

    const handleSearch = () => {
        const term = searchTerm.toLowerCase();
        const filtered = books.filter((book) =>
            book.title.toLowerCase().includes(term)
        );
        setFilteredBooks(filtered);
    };

    const handleDelete = async (id) => {
        try {
            const token = localStorage.getItem("accessToken");
            if (!token) {
                console.error("No token found. Please log in.");
                alert("You must be logged in to perform this action.");
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
    
            if (error.response?.status === 403) {
                alert("You do not have permission to delete this book.");
            } else {
                alert("Failed to delete the book. Please try again.");
            }
        }
    };
    

    return (
        <>
            <h1>Books</h1>
            <br />
            <div className="search-container">
                <input
                    type="text"
                    placeholder="Search books by title..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-input"
                />
                <button className="search-button" onClick={handleSearch}>
                    🔍
                </button>
            </div>
             <div className="items-container">
                    {filteredBooks.map(book => (
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
