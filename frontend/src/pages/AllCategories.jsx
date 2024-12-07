import React from "react"
import axios from "axios"
import {useState, useEffect} from "react"

const Categories = () => {
    const [categories, setCategories] = useState([])

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

    return (
        <><h1>Categories</h1><div className="category">
            {categories.map(category => (
                <div className="category" key={category.id}>
                    <br></br>
                    <h2>{category.name}</h2>
                    <br></br>
                </div>
            ))}
        </div></>
    )
}

export default Categories