import express from 'express';
import multer from 'multer';
import path from 'path';
import { resolve } from 'path';
import Database from 'better-sqlite3';
import { verifyToken } from './authentification.js';

const router = express.Router();
const dbPath = resolve('database/database.db');
const db = new Database(dbPath);

// Configurare Multer pentru încărcare fișiere
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads'); // Folderul unde se salvează imaginile
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Nume unic pentru fiecare fișier
  }
});

const upload = multer({ storage });

// Ruta pentru actualizarea imaginii de profil
router.post('/update-profile-picture', verifyToken, upload.single('profilePicture'), (req, res) => {
  const userId = req.user.id; // ID-ul utilizatorului obținut din tokenul de autentificare
  const profilePicturePath = `/uploads/${req.file.filename}`; // Calea imaginii încărcate

  if (!userId || !req.file) {
    return res.status(400).send('User ID and profile picture are required.');
  }

  const query = 'UPDATE users SET profile_picture = ? WHERE id = ?';
  try {
    const result = db.prepare(query).run(profilePicturePath, userId);
    if (result.changes > 0) {
      res.json({
        success: true,
        message: 'Profile picture updated successfully.',
        profilePicture: profilePicturePath,
      });
    } else {
      res.status(404).send('User not found.');
    }
  } catch (error) {
    console.error('Error updating profile picture:', error.message);
    res.status(500).send('There was an error updating the profile picture.');
  }
});

// Servirea imaginilor din folderul "uploads"
router.use('/uploads', express.static('uploads'));

export default router;
