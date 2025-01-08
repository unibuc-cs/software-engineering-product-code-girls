import React from 'react'
import {useState, useEffect} from 'react'
import axios from 'axios'
import {useNavigate, useParams} from 'react-router-dom'

const Update= () => {
    const [category,setCategory] = useState({
        name: ""
    });

    const navigate = useNavigate()

    const {id} = useParams()

    useEffect(() => {
        const fetchCategory = async () => {
            try {
                const res = await axios.get(`http://localhost:8081/categories/${id}`);
                setCategory(res.data); 
            } catch (error) {
                console.error("Error fetching the category details:", error);
            }
        };

        fetchCategory();
    }, [id]);


    const handleChange = (e) => {
        setCategory((prev)=>({...prev, [e.target.name]:e.target.value}));
    };

    const handleClick = async e => {
        e.preventDefault()
        try{
            await axios.put(`http://localhost:8081/categories/${id}`, category)
            navigate("/")
        }
        catch(error)
        {
            console.log(error)
        }
    }

    return (
        <div>
        <h1>Update the category!</h1>
        <input type = "text" placeholder='name' value = {category.name} onChange={handleChange} name="name"/>
        <button className="formButton" onClick = {handleClick}>Update</button>
        </div>
    );
}

export default Update