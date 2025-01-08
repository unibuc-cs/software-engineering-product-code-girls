
import express from 'express';
import Database from 'better-sqlite3';
import { resolve } from 'path';

const router = express.Router();
const dbPath = resolve('database/database.db');
const db = new Database(dbPath);


router.get('/:id', (req, res) => {
    const bookId = req.params.id; 
    const q = `
        SELECT user_id, comments.id, comments.content, users.name AS user_name
        FROM comments
        JOIN users ON comments.user_id = users.id
        WHERE comments.book_id = ?`;

    try {
        const comments = db.prepare(q).all(bookId); 

        if (comments.length > 0) {
            return res.json(comments); 
        } else {
            return res.status(404).send('No comments found for this book!');
        }
    } catch (error) {
        console.error('Error fetching comments: ', error.message);
        return res.status(500).send('Error fetching comments!');
    }
});



router.post('/', (req, res) => {
    const { user_id, book_id, content } = req.body;
    if (!user_id || !book_id || !content) {
        return res.status(400).send('All fields are required!');
    }
    const q = 'INSERT INTO comments (user_id, book_id, content) VALUES (?, ?, ?)';
    try {
        db.prepare(q).run(user_id, book_id, content);
        return res.status(201).send('Comment added successfully!');
    } catch (error) {
        console.error('Error adding comment: ', error.message);
        return res.status(500).send('Error adding comment!');
    }
});

router.put('/:id', (req, res) => {
    const commentId = req.params.id;
    const { content } = req.body; 
    const q = 'UPDATE comments SET content = ? WHERE id = ?';
    
    try {
        const result = db.prepare(q).run(content, commentId);
        
        if (result.changes > 0) {
            return res.send('Comment updated successfully!');
        } else {
            return res.status(404).send('Comment not found!');
        }
    } catch (error) {
        console.error('Error updating comment: ', error.message);
        return res.status(500).send('Error updating comment!');
    }
});


router.delete('/:id', (req, res) => {
    const commentId = req.params.id;
    const q = 'DELETE FROM comments WHERE id = ?';
    try {
        const result = db.prepare(q).run(commentId);
        if (result.changes > 0) {
            return res.send('Comment deleted successfully!');
        } else {
            return res.status(404).send('Comment not found!');
        }
    } catch (error) {
        console.error('Error deleting comment: ', error.message);
        return res.status(500).send('Error deleting comment!');
    }
});
export default router;