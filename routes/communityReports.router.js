// Import necessary modules
import express from "express";
import communityReportsController from "../controllers/communityReports.controller";

// Create an Express Router
const communityReportsRouter = express.Router();

// GET Routes
communityReportsRouter.get(
  "/:id",
  communityReportsController.getcommunityReportsByID
);

// POST Route
communityReportsRouter.post(
  "/users/:id/",
  communityReportsController.addcommunityReport
);

// DELETE Route
communityReportsRouter.delete(
  "/:id",
  communityReportsController.deletecommunityReportByID
);

// PUT Route
communityReportsRouter.put(
  "/:id",
  communityReportsController.updatecommunityReportByID
);

// Export the router
export default communityReportsRouter;
