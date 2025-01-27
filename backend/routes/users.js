import express from "express";
import Database from 'better-sqlite3';
import { resolve } from 'path';

const router = express.Router();
const dbPath = resolve('database/database.db');
const db = new Database(dbPath);


router.get("/", (req, res) => {
  const q = "SELECT * FROM users";
  try {
    const rows = db.prepare(q).all();
    return res.json(rows);
  } catch (error) {
    console.error("There is an error: ", error.message);
    return res.status(400).send("There is an error!");
  }
});

router.get("/:id", (req, res) => {
  const userId = req.params.id;
  const q = "SELECT * FROM users WHERE id = ?";
  try {
    const user = db.prepare(q).get(userId);
    if (user) {
      res.json(user);
    } else {
      res.status(404).send("The user was not found!");
    }
  } catch (error) {
    console.error("There is an error: ", error.message);
    return res.status(400).send("There is an error!");
  }
});



// router.delete("/:id", verifyToken, isAdmin, (req, res) => {
//   const userId = req.params.id;
//   const q = "DELETE FROM users WHERE id = ?";
//   try {
//     const result = db.prepare(q).run(userId);
//     if (result.changes > 0) {
//       res.send("The user was removed from the database!");
//     } else {
//       res.status(404).send("The user was not found!");
//     }
//   } catch (error) {
//     console.error("There occurred an error in the process of deleting the user: ", error.message);
//     return res.status(500).send("There occurred an error in the process of deleting the user!");
//   }
// });
router.post("/register", (req, res) => {
  const { name, password } = req.body;

  if (!name || !password) {
    return res.status(400).send("Name and password are required!");
  }

  try {
    const existingUser = db.prepare("SELECT * FROM users WHERE name = ?").get(name);

    if (existingUser) {
      return res.status(400).send("User already exists!");
    }

    const query = "INSERT INTO users (name, password) VALUES (?, ?)";
    const result = db.prepare(query).run(name, password);

    res.status(201).json({
      id: result.lastInsertRowid,
      name,
      profile_picture: "", 
    });
  } catch (error) {
    console.error("Error registering user:", error.message);
    res.status(500).send("Error registering user!");
  }
});

export default router;
