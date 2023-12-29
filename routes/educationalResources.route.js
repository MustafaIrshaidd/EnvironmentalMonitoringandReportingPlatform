import express from "express";
import ResourceController from "../controllers/educationalResources.controller.js";
import userRouter from "./user.route.js";
import authMiddleWare from "../controllers/middlewares/Authuntication.js";
const resourceRouter = express.Router();

// Get all resources
userRouter.get("/:userId/resources",ResourceController.getResourcesForUser);

resourceRouter.get("/", ResourceController.getResources);

// Get a specific resource by ID
resourceRouter.get("/:id", ResourceController.getResourceByID);

// Create a new resource
userRouter.post("/:id/resources",authMiddleWare.Validate, ResourceController.addResource);

// Update a resource by ID
resourceRouter.put("/:id",authMiddleWare.Validate, ResourceController.updateResourceByID);

// Delete a resource by ID
resourceRouter.delete("/:id", ResourceController.deleteResourceByID);

export default resourceRouter;
