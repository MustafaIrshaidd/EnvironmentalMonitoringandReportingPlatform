// Import necessary modules
import express from "express";
import UserController from "../controllers/user.controller.js";
import AlertController from "../controllers/alert.controller.js";

// Create an Express Router
const userRouter = express.Router();

// GET Routes
userRouter.get("/:id", UserController.getUserByID);
userRouter.get("/:id/alerts/:alert_id", AlertController.getAlertByID);

// POST Route
userRouter.post("/", UserController.addUser);
userRouter.post("/:id/alerts", AlertController.addAlertForUser);

// DELETE Route
userRouter.delete("/:id", UserController.deleteUserByID);
userRouter.delete("/:id/alerts/:alert_id", AlertController.deleteAlertByID);

// PUT Route
userRouter.put("/:id", UserController.updateUserByID);
userRouter.put("/:id/alerts/:alert_id", AlertController.updateAlertByID);

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
