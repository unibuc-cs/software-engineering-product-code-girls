
import express from 'express';
import Database from 'better-sqlite3';
import { resolve } from 'path';

const router = express.Router();
const dbPath = resolve('database/database.db');
const db = new Database(dbPath);


router.get('/:id', (req, res) => {
    const bookId = req.params.id;
    const q = `
        SELECT reviews.user_id, reviews.id, reviews.rating, users.name AS user_name
        FROM reviews
        JOIN users ON reviews.user_id = users.id
        WHERE reviews.book_id = ?`;

    try {
        const reviews = db.prepare(q).all(bookId); 

        if (reviews.length > 0) {
            return res.json(reviews);
        } else {
            return res.status(404).send('No reviews found for this book!');
        }
    } catch (error) {
        console.error('Error fetching reviews: ', error.message);
        return res.status(500).send('Error fetching reviews!');
    }
});



router.post('/', (req, res) => {
    const { user_id, book_id, rating } = req.body;
    if (!user_id || !book_id || !rating) {
        return res.status(400).send('All fields are required!');
    }
    const q = 'INSERT INTO reviews (user_id, book_id, rating) VALUES (?, ?, ?)';
    try {
        db.prepare(q).run(user_id, book_id, rating);
        return res.status(201).send('Review added successfully!');
    } catch (error) {
        console.error('Error adding review: ', error.message);
        return res.status(500).send('Error adding review!');
    }
});

router.put('/:id', (req, res) => {
    const reviewId = req.params.id; 
    const { rating } = req.body; 
    
    const q = 'UPDATE reviews SET rating = ? WHERE id = ?';
    
    try {
        const result = db.prepare(q).run(rating, reviewId);
        
        if (result.changes > 0) {
            return res.send('Review updated successfully!');
        } else {
            return res.status(404).send('Review not found!');
        }
    } catch (error) {
        console.error('Error updating review: ', error.message);
        return res.status(500).send('Error updating review!');
    }
});



router.delete('/:id', (req, res) => {
    const reviewId = req.params.id;
    const q = 'DELETE FROM reviews WHERE id = ?';
    try {
        const result = db.prepare(q).run(reviewId);
        if (result.changes > 0) {
            return res.send('Review deleted successfully!');
        } else {
            return res.status(404).send('Review not found!');
        }
    } catch (error) {
        console.error('Error deleting review: ', error.message);
        return res.status(500).send('Error deleting review!');
    }
});

export default router;