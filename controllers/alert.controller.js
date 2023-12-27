import User from "../models/user.model.js";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();



const AlertController = {
  // Get an Alert by ID
  async getAlertByID(req, res) {
    try {
      const alertFromPrisma = await prisma.alert.findUnique({
        where: { id: parseInt(req.params.id) },
      });
      //const user = await User.findById(req.params.id);
      if (!alertFromPrisma) {
        return res.status(404).send("User not found");
      }
      res.send(alertFromPrisma);
    } catch (error) {
      res.status(500).send("Internal server error");
    }
  },

  async addAlertForUser(req, res) {
    console.log("addAlertForUser");
    try {
      const { alert_type, threshold } = req.body;
      const userId = parseInt(req.params.id);
      const isActive = false;
      const alert = await prisma.alert.create({
        data: { alert_type, threshold, isActive, userId },
      });
      res.status(201).send(alert);
    } catch (error) {
      console.log(error);
    }
  },

  // Delete an Alert by ID
  async deleteAlertByID(req, res) {
    try {
      const alertFromPrisma = await prisma.alert.delete({
        where: { id: parseInt(req.params.id) },
      });
      if (!alertFromPrisma) {
        return res.status(404).send("User not found");
      }
      res.send(alertFromPrisma);
    } catch (error) {
      res.status(500).send("Internal server error");
    }
  },

  // Update an alert by ID
  async updateAlertByID(req, res) {
    try {
      const user = await prisma.user.findUnique({
        where: { id: parseInt(req.params.userid) },
      });
      if (user == null) {
        return res.status(404).send("User not found");
      }
      const { alert_type, threshold } = req.body;
      const isActive = false;
      const updatedAlertFromPrisma = await prisma.alert.update({
        where: { id: parseInt(req.params.id) },
        data: { alert_type, threshold, isActive, userId: user.id },
      });
      if (!updatedAlertFromPrisma) {
        return res.status(404).send("Alert not found");
      }
      res.send(updatedAlertFromPrisma);
    } catch (error) {
      console.log(error);
      res.status(400).send("Invalid request body");
    }
  },
};

export default AlertController;
