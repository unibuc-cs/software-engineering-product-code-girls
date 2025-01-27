import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const ShowComments = () => {
    const [comments, setComments] = useState([]);
    const { id } = useParams();
    const loggedInUserId = localStorage.getItem("userId"); 
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
    }, [id,comments]);

    const handleDelete = async (commentId) => {
        try {
            await axios.delete(`http://localhost:8081/comments/${commentId}`);
            setComments(comments.filter((comment) => comment.id !== commentId));
        } catch (error) {
            console.error("Error deleting comment:", error);
        }
    };

    const handleUpdate = async (commentId) => {
        const commentToUpdate = comments.find(comment => comment.id === commentId);
    
        if (commentToUpdate) {
            if (loggedInUserId === String(commentToUpdate.user_id)) {
                const newContent = prompt("Enter the new content for the comment:");
                if (newContent) {
                    try {
                        const updatedComment = await axios.put(`http://localhost:8081/comments/${commentId}`, { content: newContent });
    
                        setComments(
                            comments.map((comment) =>
                                comment.id === commentId ? { ...comment, content: updatedComment.data.content } : comment
                            )
                        );
                    } catch (error) {
                        console.error("Error updating comment:", error);
                    }
                }
            } else {
                alert("You are not authorized to update this comment.");
            }
        }
    };
    
    return (
        <div>
            <h1>Comments</h1>
            {comments.length === 0 ? (
                <p>No comments found.</p>
            ) : (
                <ul>
                    {comments.map((comment) => (
                        <li key={comment.id}>
                            <p><strong>User:</strong> {comment.user_name}</p>
                            <p><strong>Comment:</strong> {comment.content}</p>
                            {loggedInUserId === String(comment.user_id) && (
                                <div>
                                    <button onClick={() => handleUpdate(comment.id)}>Update</button>
                                    <button onClick={() => handleDelete(comment.id)}>Delete</button>
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ShowComments;
