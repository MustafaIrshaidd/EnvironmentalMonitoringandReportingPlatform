// Import necessary modules
import express from "express";
import connectionController from "../controllers/conncetion.controller.js";
import authMiddleWare from "../controllers/middlewares/Authuntication.js";

// Create an Express Router
const connectionRouter = express.Router();

// DELETE User Connection Routes
connectionRouter.delete(
  "/:id",
  authMiddleWare.Validate,
  connectionController.deleteConnection
);

// Export the router
export default connectionRouter;
