import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const Update = () => {
    const [book, setBook] = useState({
        category_id: 1,
        title: "",
        author: "",
        description: "",
        cover_image: "",
    });

    const [isAdmin, setIsAdmin] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        const fetchUserRole = async () => {
            const token = localStorage.getItem("accessToken");
            if (!token) {
                setErrorMessage("You must be logged in to edit a book.");
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
                } else {
                    setErrorMessage("You do not have permission to edit books. Only admins can do that.");
                }
            } catch (error) {
                console.error("Error fetching user role:", error);
                setErrorMessage("An error occurred while verifying your role.");
            }
        };

        fetchUserRole();
    }, []);

    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        const fetchBook = async () => {
            try {
                const res = await axios.get(`http://localhost:8081/books/${id}`);
                setBook(res.data);
            } catch (error) {
                console.error("Error fetching the book details:", error);
            }
        };

        fetchBook();
    }, [id]);

    const handleChange = (e) => {
        setBook((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleClick = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("accessToken");
            if (!token) {
                return console.error("No token found. Please log in.");
            }

            await axios.put(`http://localhost:8081/books/${id}`, book, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            navigate("/");
        } catch (error) {
            console.log(error);
        }
    };

    if (errorMessage) {
        return <h1>{errorMessage}</h1>;
    }

    if (!isAdmin) {
        return <h1>You do not have permission to edit the book. Only admins can do that.</h1>;
    }

    return (
        <div className="login-container">
            <h1>Update the book!</h1>
            <form className="login-form">
                <input
                    type="number"
                    placeholder="Category ID"
                    value={book.category_id}
                    onChange={handleChange}
                    name="category_id"
                />
                <input
                    type="text"
                    placeholder="Title"
                    value={book.title}
                    onChange={handleChange}
                    name="title"
                />
                <input
                    type="text"
                    placeholder="Author"
                    value={book.author}
                    onChange={handleChange}
                    name="author"
                />
                <input
                    type="text"
                    placeholder="Description"
                    value={book.description}
                    onChange={handleChange}
                    name="description"
                />
                <input
                    type="text"
                    placeholder="Cover Image URL"
                    value={book.cover_image}
                    onChange={handleChange}
                    name="cover_image"
                />
                <div className="l_button" onClick={handleClick}>
                    Update
                </div>
            </form>
        </div>
    );
};

export default Update;
