import  { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddComment = () => {
    const [content, setContent] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const checkLoginStatus = () => {
            const userId = localStorage.getItem("userId");
            if (userId) {
                setIsLoggedIn(true);
            } else {
                setErrorMessage("You must be logged in to add a comment.");
            }
        };

        checkLoginStatus();
    }, []);

    const handleChange = (e) => {
        setContent(e.target.value);
    };

    const handleClick = async (e) => {
        e.preventDefault();

        if (!content.trim()) {
            setErrorMessage("Content cannot be empty.");
            return;
        }

        if (!isLoggedIn) {
            setErrorMessage("You must be logged in to add a comment.");
            return;
        }

        const userId = localStorage.getItem("userId");
        const bookId = localStorage.getItem("bookId");

        try {
            const response = await axios.post(
                "http://localhost:8081/comments",
                { user_id: userId, book_id: bookId, content: content.trim() }
            );

            if (response.status === 201) {
                alert("Comment added successfully!");
                navigate(`/comments/${bookId}`);
            } else {
                setErrorMessage("Failed to add comment.");
            }
        } catch (error) {
            console.error("Error adding comment: ", error);
            setErrorMessage("An error occurred while adding the comment.");
        }
    };

    if (errorMessage) {
        return <h1>{errorMessage}</h1>;
    }

    return (
        <div>
            <h1>Add a Comment</h1>
            <textarea
                placeholder="Write your comment here..."
                onChange={handleChange}
                value={content}
            ></textarea>
            <button onClick={handleClick}>Add Comment</button>
        </div>
    );
};

export default AddComment;
