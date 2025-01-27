import express from "express";
import Database from 'better-sqlite3';
import { resolve } from 'path';
import { verifyToken } from "./authentification.js"; 

const router = express.Router();
const dbPath = resolve('database/database.db');
const db = new Database(dbPath);

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

router.get("/", (req, res) => {
  const q = "SELECT * FROM books";
  try {
    const rows = db.prepare(q).all();
    return res.json(rows);
  } catch (error) {
    console.error("There is an error: ", error.message);
    return res.status(400).send("There is an error!");
  }
});

router.get("/:id", (req, res) => {
  const bookId = req.params.id;
  const q = "SELECT * FROM books WHERE id = ?";
  try {
    const book = db.prepare(q).get(bookId);
    if (book) {
      res.json(book);
    } else {
      res.status(404).send("The book was not found!");
    }
  } catch (error) {
    console.error("There is an error: ", error.message);
    return res.status(400).send("There is an error!");
  }
});

router.post("/", verifyToken, isAdmin, (req, res) => {
  const { category_id, title, author, description, cover_image } = req.body;
  if (!category_id || !title || !author || !description) {
    return res.status(400).send("All the fields must be completed!");
  }
  const q = "INSERT INTO books(`category_id`, `title`, `author`, `description`, `cover_image`) VALUES (?,?,?,?,?)";
  try {
    db.prepare(q).run(category_id, title, author, description, cover_image || null);
    return res.status(200).send("The book was added to the database!");
  } catch (error) {
    console.error("There occurred an error in the process of adding the book: ", error.message);
    return res.status(500).send("There occurred an error in the process of adding the book!");
  }
});

router.put("/:id", verifyToken, isAdmin, (req, res) => {
  const bookId = req.params.id;
  const { category_id, title, author, description, cover_image } = req.body;
  const q = "UPDATE books SET category_id = ?, title = ?, author = ?, description = ?, cover_image = ? WHERE id = ?";
  try {
    const result = db.prepare(q).run(category_id, title, author, description, cover_image || null, bookId);
    if (result.changes > 0) {
      res.send("The book was updated!");
    } else {
      res.status(404).send("The book was not found.");
    }
  } catch (error) {
    console.error("There occurred an error in the process of updating the book: ", error.message);
    return res.status(500).send("There occurred an error in the process of updating the book!");
  }
});

router.delete("/:id", verifyToken, isAdmin, (req, res) => {
  const bookId = req.params.id;

  try {
    const deleteReviews = db.prepare("DELETE FROM reviews WHERE book_id = ?");
    deleteReviews.run(bookId);

    const deleteComments = db.prepare("DELETE FROM comments WHERE book_id = ?");
    deleteComments.run(bookId);

    const deleteLibrary = db.prepare("DELETE FROM library WHERE book_id = ?");
    deleteLibrary.run(bookId);

    const deleteUserBooks = db.prepare("DELETE FROM userbooks WHERE book_id = ?");
    deleteUserBooks.run(bookId);

    const deleteBook = db.prepare("DELETE FROM books WHERE id = ?");
    const result = deleteBook.run(bookId);

    if (result.changes > 0) {
      res.send("The book was removed from the database!");
    } else {
      res.status(404).send("The book was not found!");
    }
  } catch (error) {
    console.error("There occurred an error in the process of deleting the book: ", error.message);
    return res.status(500).send("There occurred an error in the process of deleting the book!");
  }
});


export default router;
