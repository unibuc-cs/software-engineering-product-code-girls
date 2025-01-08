import React from 'react'
import axios from 'axios'
import {useState, useEffect} from 'react'
import { Link } from 'react-router-dom';

const HomePage = () => {

    return (
        <><h1>GoodReadsApp</h1>
                <div className="meniu">
                    <button className="toCategories"><Link to = {`/categories`}>Categories</Link></button>
                    <button className="toBooks"><Link to = {`/books`}>Books</Link></button>
                </div>
        </>
    )
}

export default HomePage