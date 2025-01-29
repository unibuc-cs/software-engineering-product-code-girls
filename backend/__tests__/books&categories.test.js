import request from "supertest";
import express from "express";
import booksRouter from '../routes/books.js';
import categoriesRouter from '../routes/categories.js';

jest.mock('../routes/authentification.js', () => ({
  verifyToken: (req, res, next) => {
    req.user = { id: 58, role_id: 1}; 
    next();
  }
}));

const app = express();
app.use(express.json());
app.use("/books", booksRouter);
app.use("/categories", categoriesRouter);

describe("Books Router", () => {
  test("GET /books should return all books", async () => {
    const response = await request(app).get("/books");
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  test("GET /books/:id should return a single book", async () => {
    const response = await request(app).get("/books/7");
    expect(response.status).toBe(200);
  });

  test("POST /books should add a new book", async () => {
    const newBook = { category_id: 1, title: "New Book", author: "Author Name", description: "Description", cover_image:"C:\\FACULTATE\\IS2\\software-engineering-product-code-girls\\backend\\uploads\\1737917788473.jpeg"  };
    const response = await request(app)
      .post("/books")
      .send(newBook);
    expect(response.status).toBe(200);
  });


  test("DELETE /books/:id should delete a book", async () => {
    const response = await request(app).delete("/books/30");
    expect(response.status).toBe(200);
  });
});

describe("Categories Router", () => {
  test("GET /categories should return all categories", async () => {
    const response = await request(app).get("/categories");
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  test("GET /categories/:id should return a single category", async () => {
    const response = await request(app).get("/categories/1");
    expect(response.status).toBe(200);
  });

  test("POST /categories should add a new category", async () => {
    const newCategory = { name: "Romance" };
    const response = await request(app)
      .post("/categories")
      .send(newCategory);
    expect(response.status).toBe(200);
  });

});
