import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddReview = () => {
    const [rating, setRating] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const checkLoginStatus = async () => {
            const token = localStorage.getItem("accessToken");
            console.log("Token from localStorage:", token);
            if (!token) {
                setErrorMessage("You must be logged in to add a review.");
                return;
            }

            try {
                const res = await axios.get("http://localhost:8081/auth/verify-token", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (res.status === 200) {
                    setIsLoggedIn(true);
                } else {
                    setErrorMessage("You must be logged in to add a review.");
                }
            } catch (error) {
                console.error("Error verifying login status:", error);
                setErrorMessage("You must be logged in to add a review.");
            }
        };

        checkLoginStatus();
    }, []);

    const handleRatingChange = (e) => {
        setRating(e.target.value);
    };

    const handleClick = async (e) => {
        e.preventDefault();

        if (!rating || isNaN(rating) || rating < 1 || rating > 5) {
            alert("Please provide a valid rating between 1 and 5.");
            return;
        }

        if (!isLoggedIn) {
            setErrorMessage("You must be logged in to add a review.");
            return;
        }

        const token = localStorage.getItem("accessToken");
        const bookId = localStorage.getItem("bookId");

        try {
            const response = await axios.post(
                "http://localhost:8081/reviews",
                {
                    book_id: bookId,
                    rating: parseFloat(rating),
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.status === 201) {
                alert("Review added successfully!");
                navigate(`/reviews/${bookId}`);
            } else {
                setErrorMessage("Failed to add review.");
            }
        } catch (error) {
            console.error("Error adding review: ", error);
            setErrorMessage("An error occurred while adding the review.");
        }
    };

    if (errorMessage) {
        return <h1>{errorMessage}</h1>;
    }

    return (
        <div className="login-container">
            <h1>Add a Review</h1>
            <form className="login-form">
                <input
                    type="number"
                    placeholder="Rating (1-5)"
                    onChange={handleRatingChange}
                    value={rating}
                />
                <div className="l_button" onClick={handleClick}>
                    Add Review
                </div>
            </form>
        </div>
    );
};

export default AddReview;
