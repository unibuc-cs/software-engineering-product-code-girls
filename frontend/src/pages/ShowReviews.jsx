import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ShowReviews = () => {
    const [reviews, setReviews] = useState([]);
    const { id } = useParams();
    const navigate = useNavigate();
    const loggedInUserId = localStorage.getItem("userId"); 

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const res = await axios.get(`http://localhost:8081/reviews/${id}`);
                setReviews(res.data); 
            } catch (error) {
                console.error("Error fetching reviews:", error);
            }
        };

        fetchReviews();
    }, [id, reviews]);

    const handleDelete = async (reviewId) => {
        try {
            await axios.delete(`http://localhost:8081/reviews/${reviewId}`);
            setReviews(reviews.filter((review) => review.id !== reviewId));
            alert("Review deleted successfully!");
        } catch (error) {
            console.error("Error deleting review:", error);
            alert("Failed to delete review.");
        }
    };

    const handleUpdate = async (reviewId) => {
        const newRating = prompt("Enter the new rating (1-5):");

        if (newRating && !isNaN(newRating) && newRating >= 1 && newRating <= 5) {
            try {
                const updatedReview = await axios.put(`http://localhost:8081/reviews/${reviewId}`, { rating: newRating });

                setReviews(
                    reviews.map((review) =>
                        review.id === reviewId
                            ? { ...review, rating: updatedReview.data.rating }
                            : review
                    )
                );

                alert("Review updated successfully!");
            } catch (error) {
                console.error("Error updating review:", error);
                alert("Failed to update review.");
            }
        } else {
            alert("Invalid rating. Please enter a number between 1 and 5.");
        }
    };

    return (
        <div>
            <h1>Reviews</h1>
            {reviews.length === 0 ? (
                <p>No reviews found.</p>
            ) : (
                <ul>
                    {reviews.map((review) => (
                        <li key={review.id}>
                            <p><strong>Rating:</strong> {review.rating}/5</p>
                            <p><strong>Reviewed by:</strong> {review.user_name}</p>

                            {/* Only show the buttons if the logged-in user is the owner */}
                            {loggedInUserId === String(review.user_id) && (
                                <div>
                                    <button onClick={() => handleUpdate(review.id)}>Update</button>
                                    <button onClick={() => handleDelete(review.id)}>Delete</button>
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ShowReviews;
