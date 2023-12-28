// Import necessary modules
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const connectionController = {
  // Get all User Connections
  getUserConnections: async (req, res) => {
    try {
      const { id } = req.params;
      const connections = await prisma.connection.findMany({
        where: {
          userId: parseInt(id),
        },
      });
      res.json(connections);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  // Add A User Connection
  addUserConnection: async (req, res) => {
    try {
      const { id } = req.params;
      const { connectionId } = req.body;
      const userConnection = await prisma.user.findFirst({
        where: {
          id: parseInt(connectionId),
        },
      });
      if (userConnection.id === connectionId) {
        res.status(404).json({ error: "You can't connot yourself" });
      }

      if (!userConnection) {
        res.status(404).json({ error: "User not found" });
      }
      const connection = await prisma.connection.create({
        data: {
          userId: parseInt(id),
          connectionId,
        },
      });
      res.status(201).json(connection);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  },
};

export default connectionController;
