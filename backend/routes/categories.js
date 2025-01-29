import express from 'express'
import Database from 'better-sqlite3'
import { db } from '../.config.js';
import { verifyToken } from "./authentification.js";

const router = express.Router();


function isAdmin(req, res, next) {
    const userId = req.user.id; 
    const query = "SELECT role_id FROM userroles WHERE user_id = ?";
    const userRole = db.prepare(query).get(userId);
  
    if (userRole && userRole.role_id === 1) { 
      return next();
    } else {
      return res.status(403).json({ success: false, message: "Access denied. Admins only." });
    }
  }
router.get("/", (req,res) => {
    const q = "SELECT * FROM categories";
    try{
        const rows = db.prepare(q).all();
        return res.json(rows);
    }
    catch{
        console.error("There is an error: ", error.message);
        return res.status(400).send("There is an error!");
    }
});

router.get("/:id", (req,res) => {
    const categoryId = req.params.id;
    const q = "SELECT * FROM categories WHERE id = ?";
    try{
        const category = db.prepare(q).get(categoryId);
        if(category){
            res.json(category);
        }
        else{
            res.status(404).send("The category was not found!");
        }
    }
    catch(error){
        console.error("There is an error: ", error.message);
        return res.status(400).send("There is an error!");
    }
});

router.post("/", verifyToken, isAdmin, (req,res) => {
    const {name} = req.body;
    if(!name) {
        return res.status(400).send("All the fields must be completed!");
    }
    const q = "INSERT INTO categories(`name`) VALUES (?)";
    try{
        db.prepare(q).run(name);
        return res.status(200).send("The category was added to the database!");
    }
    catch(error){
        console.error("There occured an error in the process of adding the category: ", error.message);
        return res.status(500).send("There occured an error in the process of adding the category!");
    }
});

router.put("/:id", verifyToken, isAdmin, (req,res) => {
    const categoryId = req.params.id;
    const {name} = req.body;
    const q = "UPDATE categories SET name = ? WHERE id = ?";
    try{
        const result = db.prepare(q).run(name, categoryId);
        if(result.changes>0){
            res.send("The category was updated!");
        }
        else{
            res.status(404).send("The category was not found.");
        }
    }
    catch(error)
    {
        console.error("There occured an error in the process of updating the category: ", error.message);
        return res.status(500).send("There occured an error in the process of updating the category!");
    }
});

router.delete("/:id", verifyToken, isAdmin, (req,res) => {
    const categoryId = req.params.id;
    const q = "DELETE FROM categories WHERE id = ?";
    try{
        const result = db.prepare(q).run(categoryId);
        if(result.changes>0){
            res.send("The category was removed from the database!");
        }
        else{
            res.status(404).send("The category was not found!");
        }
    }
    catch(error){
        console.error("There occured an error in the process of deleting the category: ", error.message);
        return res.status(500).send("There occured an error in the process of deleting the category!");
    }
});

export default router;
