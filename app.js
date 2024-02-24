import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./config/db.js";
import dishRouter from "./routes/dishRoutes.js";
import recipeRouter from "./routes/recipeRoutes.js";

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
// app.use(express.static("public"));

// MongoDB Connection
connectDB();

// import dish
app.use("/api/dish", dishRouter);

// import recipe
app.use("/api/recipe", recipeRouter);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
