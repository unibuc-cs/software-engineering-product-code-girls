import request from 'supertest';
import express from 'express';
import commentsRouter from '../routes/comments.js';

jest.mock('../routes/authentification.js', () => ({
  verifyToken: (req, res, next) => {
    req.user = { id: 1 };
    next();
  }
}));

const app = express();
app.use(express.json());
app.use('/comments', commentsRouter);

describe('Comments Router', () => {
  test('GET /comments/:id should return comments for a book', async () => {
    const response = await request(app).get('/comments/7');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  test('POST /comments should add a comment', async () => {
    const newComment = { book_id: 20, content: 'Great book!' };
    const response = await request(app)
      .post('/comments')
      .send(newComment);
    expect(response.status).toBe(201);
    expect(response.text).toBe('Comment added successfully!');
  });

  test('PUT /comments/:id should update a comment', async () => {
    const updatedComment = { content: 'Updated comment content' };
    const response = await request(app)
      .put('/comments/41')
      .send(updatedComment);
    expect(response.status).toBe(200);
    expect(response.text).toBe('Comment updated successfully!');
  });

  test('PUT /comments/:id should not update another user’s comment', async () => {
    const updatedComment = { content: 'Unauthorized update attempt' };
    const response = await request(app)
      .put('/comments/14')
      .send(updatedComment);
    expect(response.status).toBe(404);
    expect(response.text).toBe('Comment not found or you are not authorized to edit this comment.');
  });

  test('DELETE /comments/:id should delete a comment', async () => {
    const response = await request(app).delete('/comments/41');
    expect(response.status).toBe(200);
    expect(response.text).toBe('Comment deleted successfully!');
  });
  test('DELETE /comments/:id should not delete another user’s comment', async () => {
    const response = await request(app).delete('/comments/14');
    expect(response.status).toBe(404);
    expect(response.text).toBe('Comment not found or you are not authorized to delete this comment.');
  });
});

