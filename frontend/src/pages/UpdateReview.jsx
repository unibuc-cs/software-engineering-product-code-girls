import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateReview = () => {
    const [rating, setRating] = useState(""); 

    const navigate = useNavigate();
    const { id } = useParams(); 

    useEffect(() => {
        const fetchReview = async () => {
            try {
                const res = await axios.get(`http://localhost:8081/reviews/${id}`);
                setRating(res.data.rating);  
            } catch (error) {
                console.error("Error fetching the review details:", error);
            }
        };

        fetchReview();
    }, [id]);

    const handleChange = (e) => {
        setRating(e.target.value); 
    };

    const handleClick = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:8081/reviews/${id}`, { rating }); 
            const res = await axios.get(`http://localhost:8081/reviews/${id}`);
            setRating(res.data.rating);

            alert("Review updated successfully!");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <h1>Update Rating</h1>
            <textarea 
                placeholder="Rating" 
                value={content} 
                onChange={handleChange} 
                name="content" 
            />
            <button className="formButton" onClick={handleClick}>
                Update Rating
            </button>
        </div>
    );
};

export default UpdateReview;
