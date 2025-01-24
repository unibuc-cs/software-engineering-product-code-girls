import express from "express";
import Database from 'better-sqlite3';
import { resolve } from 'path';
import { verifyToken } from "./authentification.js"; 

const router = express.Router();
const dbPath = resolve('database/database.db');
const db = new Database(dbPath);


router.get("/", (req, res) => {
  const q = "SELECT * FROM library";
  try {
    const rows = db.prepare(q).all();
    return res.json(rows);
  } catch (error) {
    console.error("There is an error: ", error.message);
    return res.status(400).send("There is an error!");
  }
});

router.get("/id/:user_id", (req, res) => {
    const { user_id } = req.params; // Extrage valoarea direct
    const q = "SELECT * FROM library WHERE user_id = ?";

    try {
        // Validare pentru user_id
        if (!user_id) {
            console.error("Invalid user id provided.");
            return res.status(400).send("Invalid user ID.");
        }

        // Execută interogarea
        const book = db.prepare(q).all(user_id);

        if (book) {
            // Returnează cartea găsită
            return res.json(book);
        } else {
            // Niciun rezultat găsit
            res.status(404).send(`No books found for user with ID ${user_id}.`);
        }
    } catch (error) {
        // Gestionarea erorilor
        console.error("There is an error in get userid: ", error.message);
        res.status(500).send("There is an error processing your request.");
    }
});

router.get("/:user_id/:book_id", (req, res) => {
    const { user_id, book_id } = req.params; // Extrage parametrii din URL
    const q = "SELECT * FROM library WHERE user_id = ? AND book_id = ?";

    try {
        if( !book_id) {
            return res.status(440).send("Invalid user or book id.");
        }
        // Execută interogarea
        const book = db.prepare(q).get(user_id, book_id);

        if (book) {
            // Returnează cartea găsită
            res.json(book);
        } else {
            return res.status(450).send("The book is not in your library.");
     }
    } catch (error) {
        // Tratează erorile interne
        console.error("There is an error in userid+bookid : ", error.message);
        res.status(500).send("There is an error processing your request.");
    }
});


//verifyToken
router.post("/add", async (req, res) => {
    const { user_id, book_id } = req.body; // Destructurează valorile din body
    //const checkQuery = "SELECT * FROM library WHERE user_id = ? ";
    const insertQuery = "INSERT INTO library(`user_id`, `book_id`) VALUES (?, ?)";

    try {
        // // Verifică dacă cartea există deja în bibliotecă
        //  const [existingEntries] = await db.prepare(checkQuery).all(user_id);
        // console.log( existingEntries);
        //  if (existingEntries.length > 0) {
        //      return res.status(400).json({ message: "The book is already in your library." });
        //  }

        // Adaugă cartea în tabel
        db.prepare(insertQuery).run(user_id, book_id);
        return res.status(200).json({ message: "The book was added to your library!" });
    } catch (error) {
        console.error("There was an error while adding the book: ", error.message);
        return res.status(500).json({ message: "There was an error while adding the book!" });
    }
});


// router.put("/:user_id/:book_id", verifyToken, isAdmin, (req, res) => {
//   const bookId = req.params.id;
//   const { category_id, title, author, description } = req.body;
//   const q = "UPDATE books SET category_id = ?, title = ?, author = ?, description = ? WHERE id = ?";
//   try {
//     const result = db.prepare(q).run(category_id, title, author, description, bookId);
//     if (result.changes > 0) {
//       res.send("The book was updated!");
//     } else {
//       res.status(404).send("The book was not found.");
//     }
//   } catch (error) {
//     console.error("There occurred an error in the process of updating the book: ", error.message);
//     return res.status(500).send("There occurred an error in the process of updating the book!");
//   }
// });

// router.delete("/:id", verifyToken, isAdmin, (req, res) => {
//   const bookId = req.params.id;
//   const q = "DELETE FROM books WHERE id = ?";
//   try {
//     const result = db.prepare(q).run(bookId);
//     if (result.changes > 0) {
//       res.send("The book was removed from the database!");
//     } else {
//       res.status(404).send("The book was not found!");
//     }
//   } catch (error) {
//     console.error("There occurred an error in the process of deleting the book: ", error.message);
//     return res.status(500).send("There occurred an error in the process of deleting the book!");
//   }
// });

export default router;
