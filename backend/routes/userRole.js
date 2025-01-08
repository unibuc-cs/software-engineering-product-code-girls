import express from 'express';
import Database from 'better-sqlite3';
import { resolve } from 'path';
import { verifyToken } from './authentification.js';

const router = express.Router();

// Database setup
const dbPath = resolve('database/database.db');
const db = new Database(dbPath);

router.get('/', verifyToken, async (req, res) => {
  try {
    const userId = req.user.id;

    if (!userId) {
      return res.status(400).json({ message: 'Invalid user ID' });
    }

    const roleQuery = db.prepare('SELECT role_id FROM userroles WHERE user_id = ?');
    const role = roleQuery.get(userId); 

    if (role) {
      return res.json({ role: role.role_id });
    } else {
      return res.status(404).json({ message: 'Role not found' });
    }
  } catch (error) {
    console.error('Error retrieving role:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default router;
