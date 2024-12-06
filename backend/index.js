import express from "express"
import bookRoutes from "./routes/books.js"
import categoryRoutes from "./routes/categories.js"

const app = express();

app.use(express.json());

app.use("/books", bookRoutes);

app.use("/categories", categoryRoutes);

app.listen(8081, () => {
    console.log("Connected to backend!")
})