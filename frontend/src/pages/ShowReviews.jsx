import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useUser } from './UserContext';

const ShowReviews = () => {
    const [reviews, setReviews] = useState([]);
    const { id } = useParams();
    const { user } = useUser(); // Utilizează UserContext pentru utilizatorul logat
    const loggedInUserId = user?.id || localStorage.getItem("userId");

    // Fetch reviews
    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const res = await axios.get(`http://localhost:8081/reviews/${id}`);
                console.log("Fetched reviews:", res.data);
                setReviews(res.data);
            } catch (error) {
                console.error("Error fetching reviews:", error);
            }
        };

        fetchReviews();
    }, [id]);

    // Handle delete review
    const handleDelete = async (reviewId) => {
        try {
            console.log("Deleting review with ID:", reviewId);

            const token = localStorage.getItem("accessToken");
            if (!token) {
                console.error("No token found. User must be logged in.");
                alert("You must be logged in to delete a review.");
                return;
            }

            await axios.delete(`http://localhost:8081/reviews/${reviewId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const updatedReviews = reviews.filter((review) => review.id !== reviewId);
            setReviews(updatedReviews);

            console.log("Review deleted successfully:", updatedReviews);
            alert("Review deleted successfully!");
        } catch (error) {
            console.error("Error deleting review:", error);

            if (error.response?.status === 403) {
                alert("You do not have permission to delete this review.");
            } else {
                alert("Failed to delete review. Please try again.");
            }
        }
    };

    // Handle update review
    const handleUpdate = async (reviewId) => {
        console.log("Updating review with ID:", reviewId);
        const newRating = prompt("Enter the new rating (1-5):");

        if (newRating && !isNaN(newRating) && newRating >= 1 && newRating <= 5) {
            try {
                const token = localStorage.getItem("accessToken");

                const updatedReview = await axios.put(
                    `http://localhost:8081/reviews/${reviewId}`,
                    { rating: parseFloat(newRating) },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                // Fetch updated reviews after update
                const res = await axios.get(`http://localhost:8081/reviews/${id}`);
                setReviews(res.data);

                console.log("Review updated successfully:", updatedReview.data);
                alert("Review updated successfully!");
            } catch (error) {
                console.error("Error updating review:", error);
                alert("Failed to update review.");
            }
        } else {
            alert("Invalid rating. Please enter a number between 1 and 5.");
        }
    };

    // Generate stars based on rating
    const renderStars = (rating) => {
        const fullStars = Math.floor(rating);
        const emptyStars = 5 - fullStars;
        return (
            <div className="stars">
                {"★".repeat(fullStars)}
                {"☆".repeat(emptyStars)}
            </div>
        );
    };

    return (
        <div className="reviews-section">
            <h1>Reviews</h1>
            {reviews.length === 0 ? (
                <p>No reviews found.</p>
            ) : (
                reviews.map((review) => (
                    <div className="review-box" key={review.id}>
                        <p><strong>Rating:</strong> {renderStars(review.rating)}</p>
                        <p><strong>Reviewed by:</strong> {review.user_name}</p>
                        {String(loggedInUserId) === String(review.user_id) && (
                            <div className="review-actions">
                                <button onClick={() => handleUpdate(review.id)}>Update</button>
                                <button onClick={() => handleDelete(review.id)}>Delete</button>
                            </div>
                        )}
                    </div>
                ))
            )}
        </div>
    );
};

export default ShowReviews;
