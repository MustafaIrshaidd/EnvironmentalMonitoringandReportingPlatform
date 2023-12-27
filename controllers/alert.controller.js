import { Prisma } from "@prisma/client";
import User from "../models/user.model.js";

const AlertController = {
  // Get an Alert by ID
  async getAlertByID(req, res) {
    try {
      const user = await User.findById(req.params.id);
      if (!user) {
        return res.status(404).send("User not found");
      }
      const alerts = await user.alerts.filter(
        (alert) => alert._id.toString() === req.params.alert_id
      );
      if (!alerts) {
        return res.status(404).send("Altert not found");
      }
      res.send(alerts);
    } catch (error) {}
  },

  // Add a new alert to the user's alert list

  // const user = await prisma.user.create({
  //     data: {
  //       username,
  //       name,
  //       password,
  //       created_at: new Date(Date.now()),
  //     },
  //   });

  //   res.status(201).send(user);
  // } catch (error) {
  //   res.status(400).send("Invalid request body");
  // }
  async addAlertForUser(req, res) {
    try {
      const { alert_type, threshold } = req.body;
      const data = { alert_type, threshold };

      const userId = req.params.id;
      const alert = Prisma.alert.create({
        data: { alert_type, threshold },
      });
      const user = await Prisma.user.findById(userId);
      if (!user) {
        return res.status(404).send("User not found");
      }
      const alertsForUser = user.alerts;
      alertsForUser.forEach((alert) => {
        if (alert.alert_type === alert_type) {
          return res.status(400).send("Alert already exists");
        }
      });
      alertsForUser.push(data);
      await user.save();
      res.status(201).send(data);
    } catch (error) {}
  },

  // Delete an Alert by ID
  async deleteAlertByID(req, res) {
    try {
      const user = await User.findById(req.params.id);

      if (user) {
        const alert = await user.alerts.filter(
          (alert) => alert._id.toString() === req.params.alert_id
        );
        if (alert.length === 0) {
          return res.status(404).send("Alert not found");
        }

        user.alerts.forEach((alert) => {
          if (alert._id.toString() === req.params.alert_id) {
            user.alerts.pull(alert);
          }
        });
        await user.save();
        res.status(200).send(alert);
      } else return res.status(404).send("User not found");
    } catch (error) {}
  },

  // Update an alert by ID
  async updateAlertByID(req, res) {
    try {
      const { alert_type, threshold } = req.body;
      const user = await User.findById(req.params.id);

      if (user) {
        const alert = await user.alerts.filter(
          (alert) => alert._id.toString() === req.params.alert_id
        );

        if (alert.length === 0) {
          return res.status(404).send("Alert not found");
        }

        user.alerts.forEach((alert) => {
          if (alert._id.toString() === req.params.alert_id) {
            alert.alert_type = alert_type;
            alert.threshold = threshold;
          }
        });
        await user.save();
        res.status(201).send(alert);
      } else return res.status(404).send("User not found");
    } catch (error) {}
  },
};

export default AlertController;
