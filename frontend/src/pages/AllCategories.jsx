import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const fetchUserRole = async () => {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        console.error("No token found. Please log in.");
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
        }
      } catch (error) {
        console.error("Error fetching user role:", error);
      }
    };

    fetchUserRole();
  }, []);

  useEffect(() => {
    const fetchAllCategories = async () => {
      try {
        const res = await axios.get("http://localhost:8081/categories");
        setCategories(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllCategories();
  }, []);

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        console.error("No token found. Please log in.");
        return;
      }

      await axios.delete(`http://localhost:8081/categories/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      window.location.reload();
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  return (
    <>
      <h1>Categories</h1>
      <div className="categories-container">
        {categories.map((category) => (
          <div className="category-box" key={category.id}>
            <h2>{category.name}</h2>
            {isAdmin && (
              <>
                <button
                  onClick={() => {
                    handleDelete(category.id);
                  }}
                >
                  Delete
                </button>
                <button>
                  <Link to={`/categories/update/${category.id}`}>Update</Link>
                </button>
              </>
            )}
            <button>
              <Link to={`/categories/${category.id}`}>Details</Link>
            </button>
          </div>
        ))}
        {isAdmin && (
          <button>
            <Link to="/categories/add">Add new category!</Link>
          </button>
        )}
      </div>
    </>
  );
};

export default Categories;
