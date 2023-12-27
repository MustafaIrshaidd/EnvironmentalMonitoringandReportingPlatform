// Import necessary modules
import CommunityReport from "../models/communityReports.model.js";
import User from "../models/user.model.js";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const communityReportsController = {
  // Get all community reports
  getAllCommunityReports: async (req, res) => {
    try {
      const reports = await prisma.communityReport.findMany();
      res.json(reports);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  // Get community report by ID
  getCommunityReportByID: async (req, res) => {
    try {
      const report = await prisma.communityReport.findUnique({
        where: { id: parseInt(req.params.id) },
      });
      if (!report) {
        return res.status(404).json({ error: "Community report not found" });
      }
      res.json(report);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  // Add a new community report
  addCommunityReport: async (req, res) => {
    try {
      const { userId } = req.params;
      const { report_type, description, location } = req.body;
      const user_id = parseInt(userId);
      const newReport = await prisma.communityReport.create({
        data: {
          user_id,
          report_type,
          description,
          created_at: new Date(Date.now()),
          location,
        },
      });
      res.status(201).json(newReport);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  // Delete community report by ID
  deleteCommunityReportByID: async (req, res) => {
    try {
      const deletedReport = await prisma.communityReport.delete({
        where: { id: parseInt(req.params.id) },
      });
      
      if (!deletedReport) {
        return res.status(404).json({ error: "Community report not found" });
      }
      res.json(deletedReport);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  // Update community report by ID
  updateCommunityReportByID: async (req, res) => {
    try {
      const updatedReport = await CommunityReport.findByIdAndUpdate(
        req.params.id,
        { $set: req.body }
      );
      if (!updatedReport) {
        return res.status(404).json({ error: "Community report not found" });
      }
      res.json(updatedReport);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  },
};

export default communityReportsController;
