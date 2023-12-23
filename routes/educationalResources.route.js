import express from "express";
import ResourceController from "../controllers/educationalResources.controller.js";
const resourceRouter = express.Router();

// Get all resources
resourceRouter.get("/", ResourceController.getResources);

// Get a specific resource by ID
resourceRouter.get("/:id", ResourceController.getResourceByID);

// Create a new resource
resourceRouter.post("/", ResourceController.addResource);

// Update a resource by ID
resourceRouter.put("/:id", ResourceController.updateResourceByID);

// Delete a resource by ID
resourceRouter.delete("/:id", ResourceController.deleteResourceByID);

export default resourceRouter;
