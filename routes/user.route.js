// Import necessary modules
import express from "express";
import UserController from "../controllers/user.controller.js";
import AlertController from "../controllers/alert.controller.js";
import authMiddleWare from "../controllers/middlewares/Authuntication.js";
import connectionController from "../controllers/conncetion.controller.js";

// Create an Express Router
const userRouter = express.Router();

// GET Routes
userRouter.get("/:id", authMiddleWare.Validate, UserController.getUserByID);
userRouter.get(
  "/:userid/alerts/:id",
  authMiddleWare.Validate,
  AlertController.getAlertByID
);

// POST Route
userRouter.post("/", UserController.addUser);
userRouter.post(
  "/:id/alerts",
  authMiddleWare.Validate,
  AlertController.addAlertForUser
);

// DELETE Route
userRouter.delete(
  "/:id",
  authMiddleWare.Validate,
  UserController.deleteUserByID
);
userRouter.delete(
  "/:userid/alerts/:id",
  authMiddleWare.Validate,
  AlertController.deleteAlertByID
);

// PUT Route
userRouter.put("/:id", authMiddleWare.Validate, UserController.updateUserByID);
userRouter.put(
  "/:userid/alerts/:id",
  authMiddleWare.Validate,
  AlertController.updateAlertByID
);

// Interests Routes
userRouter.post(
  "/:id/interests",
  authMiddleWare.Validate,
  UserController.addInterest
);
userRouter.delete(
  "/:id/interests/:interestId",
  authMiddleWare.Validate,
  UserController.deleteInterest
);
userRouter.put(
  "/:id/interests/:interestId",
  authMiddleWare.Validate,
  UserController.updateInterest
);

// Connections Routes
userRouter.post(
  "/:id/connections",
  authMiddleWare.Validate,
  UserController.addConnection
);
userRouter.delete(
  "/:id/connections/:connectionId",
  UserController.deleteConnection
);

// GET Routes
userRouter.get(
  "/:id/connection",
  authMiddleWare.Validate,
  connectionController.getUserConnections
);

// POST Routes
userRouter.post(
  "/:id/connection",
  authMiddleWare.Validate,
  connectionController.addUserConnection
);

// Export the router
export default userRouter;
