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

// Interests Routes
userRouter.post("/:id/interests", UserController.addInterest);
userRouter.delete("/:id/interests/:interestId", UserController.deleteInterest);
userRouter.put("/:id/interests/:interestId", UserController.updateInterest);

// Connections Routes
userRouter.post("/:id/connections", UserController.addConnection);
userRouter.delete(
  "/:id/connections/:connectionId",
  UserController.deleteConnection
);

// Export the router
export default userRouter;
