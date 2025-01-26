import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const Update = () => {
    const [category, setCategory] = useState({
        name: "",
    });

    const [isAdmin, setIsAdmin] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        const fetchUserRole = async () => {
            const token = localStorage.getItem("accessToken");
            if (!token) {
                setErrorMessage("You must be logged in to edit a category.");
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
                    setErrorMessage("You do not have permission to edit categories. Only admins can do that.");
                }
            } catch (error) {
                console.error("Error fetching user role:", error);
                setErrorMessage("An error occurred while verifying your role.");
            }
        };

        fetchUserRole();
    }, []);

    useEffect(() => {
        const fetchCategory = async () => {
            try {
                const res = await axios.get(`http://localhost:8081/categories/${id}`);
                setCategory(res.data);
            } catch (error) {
                console.error("Error fetching the category details:", error);
                setErrorMessage("An error occurred while fetching the category details.");
            }
        };

        fetchCategory();
    }, [id]);

    const handleChange = (e) => {
        setCategory((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleClick = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("accessToken");

            await axios.put(`http://localhost:8081/categories/${id}`, category, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            navigate("/");
        } catch (error) {
            console.error("Error updating the category:", error);
            setErrorMessage("An error occurred while updating the category.");
        }
    };

    if (errorMessage) {
        return <h1>{errorMessage}</h1>;
    }

    if (!isAdmin) {
        return <h1>You do not have permission to edit the category. Only admins can do that.</h1>;
    }

    return (
        <div className="login-container">
            <h1>Update the category!</h1>
            <form className="login-form">
                <input
                    type="text"
                    placeholder="Category Name"
                    value={category.name}
                    onChange={handleChange}
                    name="name"
                />
                <div className="l_button" onClick={handleClick}>
                    Update
                </div>
            </form>
        </div>
    );
};

export default Update;
