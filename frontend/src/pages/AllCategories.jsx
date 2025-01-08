import React from "react"
import axios from "axios"
import {useState, useEffect} from "react"
import { Link } from "react-router-dom";

const Categories = () => {
    const [categories, setCategories] = useState([])
    const [isAdmin, setIsAdmin] = useState(false);
    useEffect(() => {
        const fetchUserRole = async () => {
          const token = localStorage.getItem('accessToken');
          if (!token) {
            console.error('No token found. Please log in.');
            return ;
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

    useEffect( () => {
        const fetchAllCategories = async() => {
            try{
                const res = await axios.get("http://localhost:8081/categories")
                setCategories(res.data)
            }
            catch(error){
                console.log(error)
            }
        }
        fetchAllCategories()
    }, [])

    const handleDelete = async (id) => {
        try{
            await axios.delete("http://localhost:8081/categories/"+id)
            window.location.reload()
        }catch(error){
            console.log(error)
        }
    }

    return (
        <><h1>Categories</h1><div className="category">
            {categories.map(category => (
                <div className="category" key={category.id}>
                    <h2>{category.name}</h2>
                    {isAdmin && (
                        <>
                        <button className="delete" onClick = {()=>{handleDelete(category.id)}} >Delete</button>
                        <button className="update"><Link to = {`/categories/update/${category.id}`}>Update</Link></button>
                        </>
                    )
                    }
                    <button className="details"><Link to = {`/categories/${category.id}`}>Details</Link></button>
                </div>
            ))}
        {isAdmin && (
            <button><Link to="/categories/add">Add new category!</Link></button>
        )
        }   
        </div></>
    )
}

export default Categories