// Import necessary modules
import express from "express";
import dataCollectionController from "../controllers/dataCollection.controller.js";

// Create an Express Router
const dataCollectionRouter = express.Router();

// GET Routes
dataCollectionRouter.get(
  "/:id",
  dataCollectionController.getdataCollectionByID
);

// GET all for open data access
dataCollectionRouter.get("/", dataCollectionController.getAllData);

// POST Route
dataCollectionRouter.post(
  "/users/:id/",
  dataCollectionController.adddataCollection
);

// DELETE Route
dataCollectionRouter.delete(
  "/:id",
  dataCollectionController.deleteDataCollectionByID
);

// PUT Route
dataCollectionRouter.put(
  "/:id",
  dataCollectionController.updateDataCollectionByID
);

// Export the router
export default dataCollectionRouter;
