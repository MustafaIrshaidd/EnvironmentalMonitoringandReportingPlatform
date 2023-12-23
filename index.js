// Import statements
import express from "express";
import cors from "cors";
import databaseConnection from "./services/DatabaseConnection.js";
import userRouter from "./routes/user.route.js";
import dataCollectionRouter from "./routes/dataCollection.router.js";
import resourceRouter from "./routes/educationalResources.route.js";

// Create an Express app
const app = express();
app.use(cors());
app.use("/uploads", express.static("./images"));

// Middleware setup
app.use(express.json());

// Routes
app.use(`/users`, userRouter);
app.use(`/dataCollection`, dataCollectionRouter);
app.use(`/resources/educational`, resourceRouter);

// Start the Express server
app.listen(3000, () => {
  console.log("server Starting at http://localhost:3000");
});

// Singleton DataBase Connection
databaseConnection.connect();
