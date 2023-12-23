// Import necessary modules
import express from "express";
import UserController from "../controllers/user.controller.js";

// Create an Express Router
const userRouter = express.Router();

// GET Routes
userRouter.get("/:id", UserController.getUserByID);

// POST Route
userRouter.post("/", UserController.addUser);

// DELETE Route
userRouter.delete("/:id", UserController.deleteUserByID);

// PUT Route
userRouter.put("/:id", UserController.updateUserByID);

// Export the router
export default userRouter;
