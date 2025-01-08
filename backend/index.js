import express from "express"
import bookRoutes from "./routes/books.js"
import categoryRoutes from "./routes/categories.js"
import userRoutes from "./routes/authentification.js"
import roleRoutes from "./routes/userRole.js"
import reviewRoutes from "./routes/reviews.js";
import commentRoutes from "./routes/comments.js"; 
import cors from "cors"
import dotenv from 'dotenv';

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors())

app.use("/books", bookRoutes);

app.use("/categories", categoryRoutes);

app.use("/users", userRoutes);

app.use("/userrole", roleRoutes);

app.use("/comments", commentRoutes);

app.use("/reviews", reviewRoutes);

app.listen(8081, () => {
    console.log("Connected to backend!")
})