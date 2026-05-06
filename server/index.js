import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import dns from "node:dns/promises";
import todoRoutes from "./routes/todoRoutes.js";

dns.setServers(["8.8.8.8", "1.1.1.1"]);

// Load the environment variables from the .env file
dotenv.config();

// Initialize the express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());


// Routes
app.use("/api/todos", todoRoutes);

const PORT = process.env.PORT || 5000;

//Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URL, {
    serverSelectionTimeoutMS: 5000,
  })
  .then(() => {
    console.log("MongoDB connected successfully.");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err.message);
  });

app.get("/", (req, res) => {
  res.send("TOD API is running...");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
