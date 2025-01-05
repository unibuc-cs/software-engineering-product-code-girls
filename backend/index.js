import express from "express"
import bookRoutes from "./routes/books.js"
import categoryRoutes from "./routes/categories.js"
import userRoutes from "./routes/authentification.js"
import roleRoutes from "./routes/userRole.js"
import cors from "cors"
import dotenv from 'dotenv';

dotenv.config();
const app = express();
const multer = require('multer');
const path = require('path');
const mysql = require('mysql');

app.use(express.json());
app.use(cors())

app.use("/books", bookRoutes);

app.use("/categories", categoryRoutes);

app.use("/users", userRoutes);

app.use("/userrole", roleRoutes);

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
    db.query(query, [profilePicturePath, userId], (err, result) => {
        if (err) return res.status(500).send(err);
        res.json({ message: 'Profile picture updated successfully', profilePicture: profilePicturePath });
    });
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

app.listen(8081, () => {
    console.log("Connected to backend!")
})