import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { useUser } from './UserContext';

const ShowBook = () => {
    const [book, setBook] = useState({
        category_id: 1,
        title: "",
        author: "",
        description: "",
        cover_image: "",
    });

    const [categoryName, setCategoryName] = useState(""); // Nume categorie
    const [comments, setComments] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [averageRating, setAverageRating] = useState(0);
    const { user } = useUser();
    const { id } = useParams();
    const loggedInUserId = localStorage.getItem("userId");

    // Fetch book details
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

    // Fetch category name
    useEffect(() => {
        if (book.category_id) {
            const fetchCategory = async () => {
                try {
                    const res = await axios.get(`http://localhost:8081/categories/${book.category_id}`);
                    setCategoryName(res.data.name); // Presupunem că răspunsul conține numele categoriei sub `name`
                } catch (error) {
                    console.error("Error fetching the category name:", error);
                }
            };

            fetchCategory();
        }
    }, [book.category_id]);

    // Fetch comments
    useEffect(() => {
        const fetchComments = async () => {
            try {
                const res = await axios.get(`http://localhost:8081/comments/${id}`);
                setComments(res.data);
            } catch (error) {
                console.error("Error fetching comments:", error);
            }
        };

        fetchComments();
    }, [id]);

    // Fetch reviews and calculate the average rating
    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const res = await axios.get(`http://localhost:8081/reviews/${id}`);
                setReviews(res.data);

                const totalRating = res.data.reduce((sum, review) => sum + review.rating, 0);
                const average = res.data.length > 0 ? totalRating / res.data.length : 0;
                setAverageRating(Math.round(average));
            } catch (error) {
                console.error("Error fetching reviews:", error);
            }
        };

        fetchReviews();
    }, [id]);

    const handleUpdateComment = async (commentId) => {
        const updatedContent = prompt("Enter the updated comment:");
        if (!updatedContent || updatedContent.trim() === "") {
            alert("Comment cannot be empty.");
            return;
        }

        try {
            const token = localStorage.getItem("accessToken");
            const response = await axios.put(
                `http://localhost:8081/comments/${commentId}`,
                { content: updatedContent },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.status === 200) {
                alert("Comment updated successfully!");
                setComments((prevComments) =>
                    prevComments.map((comment) =>
                        comment.id === commentId ? { ...comment, content: updatedContent } : comment
                    )
                );
            }
        } catch (error) {
            console.error("Error updating comment:", error);
            alert("Failed to update comment.");
        }
    };

    const handleDeleteComment = async (commentId) => {
        if (!window.confirm("Are you sure you want to delete this comment?")) {
            return;
        }

        try {
            const token = localStorage.getItem("accessToken");
            const response = await axios.delete(`http://localhost:8081/comments/${commentId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.status === 200) {
                alert("Comment deleted successfully!");
                setComments((prevComments) =>
                    prevComments.filter((comment) => comment.id !== commentId)
                );
            }
        } catch (error) {
            console.error("Error deleting comment:", error);
            alert("Failed to delete comment.");
        }
    };

    const handleClick = async (e) => {
        e.preventDefault();

        if (!user?.id || !id) {
            alert('Invalid user or book data. Please try again.');
            return;
        }

        try {
            await axios.get(`http://localhost:8081/library/${user.id}/${id}`);
            alert('The book is already in your library.');
        } catch (error) {
            if (error.response?.status === 450) {
                try {
                    await axios.post(`http://localhost:8081/library/add`, {
                        user_id: user.id,
                        book_id: id,
                    });
                    alert('The book was added to your library!');
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

    const renderStars = (rating) => {
        const fullStars = Math.floor(rating);
        const emptyStars = 5 - fullStars;

        return (
            <Link to={`/reviews/${id}`}>
                <div className="stars">
                    {"★".repeat(fullStars)}
                    {"☆".repeat(emptyStars)}
                </div>
            </Link>
        );
    };

    return (
        <div>
            <div className="item-box" style={{ margin: "50px 300px" }}>
                {book.cover_image && (
                    <div>
                        <img
                            src={book.cover_image}
                            alt={`${book.title} cover`}
                            style={{ maxWidth: "300px", height: "auto", marginBottom: "20px" }}
                        />
                    </div>
                )}
                 <p style={{fontSize:"25px"}}><strong> {book.title}</strong></p>
                <p><strong>Category:</strong> {categoryName || "Loading..."}</p>
                <p><strong>Author:</strong> {book.author}</p>
                <p><strong>Description:</strong> {book.description}</p>

                <div>
                    <h3>Average Rating:</h3>
                    {renderStars(averageRating)}
                </div>

                <div className="buttons-container">
                    <button className="button-link">
                        <Link to={`/reviews/add/${id}`}>Add a Review</Link>
                    </button>
                    <button className="button-link">
                        <Link to={`/comments/add/${id}`}>Add a comment</Link>
                    </button>
                </div>
            </div>

            <button onClick={handleClick}>Add to your personal library</button>

            <div className="comments-section">
                <h1 style={{ fontSize: "30px" }}>Comments</h1>
                {comments.length === 0 ? (
                    <p>No comments found.</p>
                ) : (
                    comments.map((comment) => (
                        <div className="comment-box" key={comment.id}>
                            <p><strong>User:</strong> {comment.user_name}</p>
                            <p><strong>Comment:</strong> {comment.content}</p>
                            {loggedInUserId === String(comment.user_id) && (
                                <div className="review-actions">
                                    <button onClick={() => handleUpdateComment(comment.id)}>Update</button>
                                    <button onClick={() => handleDeleteComment(comment.id)}>Delete</button>
                                </div>
                            )}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default ShowBook;
