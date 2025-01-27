import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]); 
  const [searchTerm, setSearchTerm] = useState(""); 
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
        setFilteredCategories(res.data); 
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllCategories();
  }, []);

  const handleSearch = () => {
    const term = searchTerm.toLowerCase();
    const filtered = categories.filter((category) =>
      category.name.toLowerCase().includes(term)
    );
    setFilteredCategories(filtered);
  };

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
      setCategories((prevCategories) =>
        prevCategories.filter((category) => category.id !== id)
      );
      setFilteredCategories((prevCategories) =>
        prevCategories.filter((category) => category.id !== id)
      );
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  return (
    <>
      <h1>Categories</h1>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search categories by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <button className="search-button" onClick={handleSearch}>
          🔍
        </button>
      </div>
      <div className="categories-container">
        {filteredCategories.map((category) => (
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
            <Link to="/categories/add" style={{ fontSize: "large" }}>
              Add new category!
            </Link>
          </button>
        )}
      </div>
    </>
  );
};

export default Categories;
