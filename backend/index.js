import express from "express"
import bookRoutes from "./routes/books.js"
import categoryRoutes from "./routes/categories.js"
import userRoutes from "./routes/authentification.js"
import roleRoutes from "./routes/userRole.js"
import cors from "cors"
import dotenv from 'dotenv';
import updateProfileRouter from "./routes/profile-picture.js";
import multer from "multer"
import path from "path"
import fs from "fs"
import Database from "better-sqlite3"
import { resolve } from "path";

const dbPath = resolve("database/database.db");
const db = new Database(dbPath);

dotenv.config();
const app = express();
//const path = require('path');

app.use(express.json());
app.use(cors())

app.use("/books", bookRoutes);

app.use("/categories", categoryRoutes);

app.use("/users", userRoutes);

app.use("/userrole", roleRoutes);

app.use("/api", updateProfileRouter);


/*
// Configurare MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'your_database_name'
});*/

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads'); // Folderul unde se salvează imaginile
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Nume unic pentru fiecare fișier
    }
});

const upload = multer({ storage });

// Endpoint pentru actualizarea imaginii de profil
app.post('/update-profile-picture', upload.single('profilePicture'), (req, res) => {
    const userId = req.body.userId;
    const profilePicturePath = `/uploads/${req.file.filename}`;
    const query = 'UPDATE users SET profile_picture = ? WHERE id = ?';
    try {
        const result = db.prepare(query).run(profilePicturePath, userId);
        if (result.changes > 0) {
            res.json({ message: 'Profile picture updated successfully', profilePicture: profilePicturePath });
        } else {
            res.status(404).send('User not found');
        }
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Servirea imaginilor din folderul uploads
app.use('/uploads', express.static('uploads'));

app.get('/user/:id', (req, res) => {
    const userId = req.params.id;

    const query = 'SELECT name, profile_picture FROM users WHERE id = ?';
    db.query(query, [userId], (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results[0]);
    });
});

const uploadsDir = path.resolve('./uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

app.listen(8081, () => {
    console.log("Connected to backend!")
})