import express from 'express';
import multer from 'multer';
import path from 'path';
import { resolve } from 'path';
import Database from 'better-sqlite3';
import { verifyToken } from './authentification.js';

const router = express.Router();
const dbPath = resolve('database/database.db');
const db = new Database(dbPath);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads'); 
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); 
  }
});

const upload = multer({ storage });

router.post('/update-profile-picture', verifyToken, upload.single('profilePicture'), (req, res) => {
  const userId = req.user.id; 
  const profilePicturePath = `/uploads/${req.file.filename}`; 

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

router.use('/uploads', express.static('uploads'));

export default router;
