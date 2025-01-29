import request from 'supertest';
import express from 'express';
import reviewsRouter from '../routes/reviews.js';

jest.mock('../routes/authentification.js', () => ({
  verifyToken: (req, res, next) => {
    req.user = { id: 1 }; 
    next();
  }
}));

const app = express();
app.use(express.json());
app.use('/reviews', reviewsRouter);

describe('Reviews Router', () => {
  test('GET /reviews/:id should return reviews for a book', async () => {
    const response = await request(app).get('/reviews/7');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  test('POST /reviews should add a review', async () => {
    const newReview = { book_id: 30, rating: 5 };
    const response = await request(app)
      .post('/reviews')
      .send(newReview);
    expect(response.status).toBe(201);
    expect(response.text).toBe('Review added successfully!');
  });

  test('PUT /reviews/:id should update a review', async () => {
    const updatedReview = { rating: 1 };
    const response = await request(app)
      .put('/reviews/33')
      .send(updatedReview);
    expect(response.status).toBe(200);
    expect(response.text).toBe('Review updated successfully!');
  });

  test('DELETE /reviews/:id should delete a review', async () => {
    const response = await request(app).delete('/reviews/33');
    expect(response.status).toBe(200);
    expect(response.text).toBe('Review deleted successfully!');
  });

});
