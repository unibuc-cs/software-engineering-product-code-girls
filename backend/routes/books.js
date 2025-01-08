import express from "express"
import Database from 'better-sqlite3'
import { resolve } from 'path'

const router = express.Router();
const dbPath = resolve('database/database.db')

const db = new Database(dbPath)

router.get("/", (req,res) => {
    const q = "SELECT * FROM books"
    try{
        const rows = db.prepare(q).all()
        return res.json(rows)
    }
    catch(error){
        console.error("There is an error: ", error.message);
        return res.status(400).send("There is an error!");
    }
});

router.get("/:id", (req,res) => {
    const bookId = req.params.id;
    const q = "SELECT * FROM books WHERE id = ?";
    try{
        const book = db.prepare(q).get(bookId);
        if(book){
            res.json(book);
        }
        else{
            res.status(404).send("The book was not found!");
        }
    }
    catch(error){
        console.error("There is an error: ", error.message);
        return res.status(400).send("There is an error!");
    }
});

router.post("/", (req,res) => {
    const {category_id, title, author, description} = req.body;
    if(!category_id||!title||!author||!description) {
        return res.status(400).send("All the fields must be completed!");
    }
    const q = "INSERT INTO books(`category_id`,`title`,`author`,`description`) VALUES (?,?,?,?)";
    try{
        db.prepare(q).run(category_id, title, author, description);
        return res.status(200).send("The book was added to the database!");
    }
    catch(error){
        console.error("There occured an error in the process of adding the book: ", error.message);
        return res.status(500).send("There occured an error in the process of adding the book!");
    }
});

router.put("/:id", (req,res) => {
    const bookId = req.params.id;
    const {category_id, title, author, description} = req.body;
    const q = "UPDATE books SET category_id = ?, title = ?, author = ?, description = ? WHERE id = ?";
    try{
        const result = db.prepare(q).run(category_id, title, author, description, bookId);
        if(result.changes>0){
            res.send("The book was updated!");
        }
        else{
            res.status(404).send("The book was not found.");
        }
    }
    catch(error)
    {
        console.error("There occured an error in the process of updating the book: ", error.message);
        return res.status(500).send("There occured an error in the process of updating the book!");
    }
});

router.delete("/:id", (req,res) => {
    const bookId = req.params.id;
    const q = "DELETE FROM books WHERE id = ?";
    try{
        const result = db.prepare(q).run(bookId);
        if(result.changes>0){
            res.send("The book was removed from the database!");
        }
        else{
            res.status(404).send("The book was not found!");
        }
    }
    catch(error){
        console.error("There occured an error in the process of deleting the book: ", error.message);
        return res.status(500).send("There occured an error in the process of deleting the book!");
    }
});

export default router;

