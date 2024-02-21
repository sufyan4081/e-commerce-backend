import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./config/db.js";
import dishRouter from "./routes/dishRoutes.js";

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// MongoDB Connection
connectDB();

// import dish
app.use("/api/dish", dishRouter);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
