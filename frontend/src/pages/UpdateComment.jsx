import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateComment = () => {
    const [content, setContent] = useState("");

    const navigate = useNavigate();
    const { id } = useParams(); 

    useEffect(() => {
        const fetchComment = async () => {
            try {
                const res = await axios.get(`http://localhost:8081/comments/${id}`);
                setContent(res.data.content);  
            } catch (error) {
                console.error("Error fetching the comment details:", error);
            }
        };

        fetchComment();
    }, [id]);

    const handleChange = (e) => {
        setContent(e.target.value); 
    };

    const handleClick = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:8081/comments/${id}`, { content }); 
            navigate("/"); 
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <h1>Update Comment</h1>
            <textarea 
                placeholder="Content" 
                value={content} 
                onChange={handleChange} 
                name="content" 
            />
            <button className="formButton" onClick={handleClick}>
                Update Comment
            </button>
        </div>
    );
};

export default UpdateComment;
