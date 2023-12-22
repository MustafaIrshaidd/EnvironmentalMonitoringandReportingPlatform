// Import statements
import express from "express";
import cors from "cors";
import databaseConnection from "./services/DatabaseConnection.js";

// Create an Express app
const app = express();
app.use(cors());
app.use("/uploads", express.static("./images"));

// Middleware setup
app.use(express.json());

// Routes

// Start the Express server
app.listen(3000, () => {
  console.log("server Starting at http://localhost:3000");
});

// Singleton DataBase Connection
databaseConnection.connect();
