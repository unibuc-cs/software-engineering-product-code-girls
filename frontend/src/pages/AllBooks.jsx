import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Books = () => {
    const [books, setBooks] = useState([]);
    const [filteredBooks, setFilteredBooks] = useState([]); 
    const [searchTerm, setSearchTerm] = useState(""); 
    const [isAdmin, setIsAdmin] = useState(false);
    const [categories, setCategories] = useState({}); // Store category names

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

        const fetchCategories = async () => {
            try {
                const res = await axios.get("http://localhost:8081/categories");
                const categoryMap = {};
                res.data.forEach(category => {
                    categoryMap[category.id] = category.name;
                });
                setCategories(categoryMap);
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };

        fetchAllBooks();
        fetchCategories();
    }, []);

    const handleSearch = () => {
        const term = searchTerm.toLowerCase();
        const filtered = books.filter((book) => {
            const categoryName = categories[book.category_id] || ""; // Get category name
            return (
                book.title.toLowerCase().includes(term) ||
                book.author.toLowerCase().includes(term) ||
                categoryName.toLowerCase().includes(term)
            );
        });
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
    
            setBooks((prevBooks) => prevBooks.filter((book) => book.id !== id));
            setFilteredBooks((prevBooks) => prevBooks.filter((book) => book.id !== id));
    
            alert("Book deleted successfully!");
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
                    placeholder="Search books by title, author, or category..."
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
                        <p><strong>Author: </strong>{book.author}</p>
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
                <button style={{marginTop:"35px"}}>
                    <Link to="/books/add" style={{fontSize: "large"}}>Add new book</Link>
                </button>
            )}
            <div style={{padding: "20px"}}></div>
        </>
    );
};
export default Books;
