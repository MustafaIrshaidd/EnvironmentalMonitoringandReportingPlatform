// Import necessary modules
import express from "express";
import communityReportsController from "../controllers/communityReports.controller.js";

// Create an Express Router
const communityReportsRouter = express.Router();

// GET Routes
communityReportsRouter.get(
  "/",
  communityReportsController.getAllCommunityReports
);
communityReportsRouter.get(
  "/:id",
  communityReportsController.getCommunityReportByID
);

// POST Route
communityReportsRouter.post(
  "/users/:user_id",
  communityReportsController.addCommunityReport
);

// DELETE Route
communityReportsRouter.delete(
  "/:id",
  communityReportsController.deleteCommunityReportByID
);

// PUT Route
communityReportsRouter.put(
  "/:id",
  communityReportsController.updateCommunityReportByID
);

// Export the router
export default communityReportsRouter;
