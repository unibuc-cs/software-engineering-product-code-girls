import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddCategory = () => {
    const [category, setCategory] = useState({
        name: ""
    });
    const [isAdmin, setIsAdmin] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        const fetchUserRole = async () => {
            const token = localStorage.getItem("accessToken");
            if (!token) {
                setErrorMessage("You must be logged in to add a category.");
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
                    setErrorMessage("You do not have permission to add categories. Only admins can do that.");
                }
            } catch (error) {
                console.error("Error fetching user role:", error);
                setErrorMessage("An error occurred while verifying your role.");
            }
        };

        fetchUserRole();
    }, []);

    const navigate = useNavigate();

    const handleChange = (e) => {
        setCategory((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleClick = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('accessToken');

            if (!token) {
                return console.error('No token found. Please log in.');
            }

            await axios.post("http://localhost:8081/categories", category, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            navigate("/");
        } catch (error) {
            if (error.response && error.response.status === 403) {
                setErrorMessage("You do not have permission to add categories. Only admins can do that.");
            } else {
                console.error("Error adding category:", error);
            }
        }
    };

    if (errorMessage) {
        return <h1>{errorMessage}</h1>;
    }

    if (!isAdmin) {
        return <h1>You do not have permission to add categories. Only admins can do that.</h1>;
    }

    return (
        <div className="login-container">
            <h1>Add a new category!</h1>
            <form className="login-form">
                <input
                    type="text"
                    placeholder="Category Name"
                    onChange={handleChange}
                    name="name"
                />
                <div className="l_button" onClick={handleClick}>
                    Add Category
                </div>
            </form>
        </div>
    );
};

export default AddCategory;
