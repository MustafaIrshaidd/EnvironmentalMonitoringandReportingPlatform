import User from "../models/user.model.js";
import mongoose from "mongoose";
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const UserController = {
  // Get a user by ID
  async getUserByID(req, res) {
    try {
      console.log("UserId: ", );	
      const userFromPrisma = await prisma.user.findUnique({where: {id: parseInt(req.params.id)}});
      //const user = await User.findById(req.params.id);
      if (!userFromPrisma) {
        return res.status(404).send("User not found");
      }
      res.send(userFromPrisma);
    } catch (error) {
      res.status(500).send("Internal server error");
    }
  },

  // Add a new user
  async addUser(req, res) {
    try {
      const { username, name, password } = req.body;
    
     const user= await prisma.user.create({
        data: {
          username,
          name,
          password,
          created_at: new Date(Date.now()),
        }});

      res.status(201).send(user);
    } catch (error) {
      res.status(400).send("Invalid request body");
    }
  },

  // Delete a user by ID
  async deleteUserByID(req, res) {
    try {
      const userFromPrisma = await prisma.user.delete({where: {id: parseInt(req.params.id)}});
      if (!userFromPrisma) {
        return res.status(404).send("User not found");
      }
      res.send(userFromPrisma);
    } catch (error) {
      res.status(500).send("Internal server error");
    }
  },

  // Update a user by ID
  async updateUserByID(req, res) {
    try {
      const { username, name, password } = req.body;
      const updatedUserFromPrisma = await prisma.user.update({where: {id: parseInt(req.params.id)}, data: {username, name, password}});
      if (!updatedUserFromPrisma) {
        return res.status(404).send("User not found");
      }
      res.send(updatedUserFromPrisma);
    } catch (error) {
      res.status(400).send("Invalid request body");
    }
  },

  // Add an interest
  async addInterest(req, res) {
    try {
      const { intreset } = req.body;
      const newIntrest = await prisma.Interest.create({data: {interest: intreset , userId: parseInt(req.params.id)}});
      if (newIntrest) {
        res.status(201).send(newIntrest);
      } else {
        return res.status(404).send("User not found");
      }
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  },
  // Delete an interest by ID
  async deleteInterest(req, res) {
    try {
      const intreset=await prisma.interest.delete({where: {id: parseInt(req.params.interestId)}});
      res.send({ message: "Interest deleted successfully" });

      if (!intreset) {
        return res.status(404).send("intrest not found");
      }
      
    } catch (error) {
      res.status(500).send("Internal server error");
    }
  },

  // Update an interest by ID
  async updateInterest(req, res) {
    try {
      const { intreset } = req.body;
      const intresetToUpdate=await prisma.interest.update({where: {id: parseInt(req.params.interestId)}, data: {interest:intreset}});
      if (!intresetToUpdate) {
        return res.status(404).send("intrest not found");
      }
     
      res.send(intresetToUpdate);
    } catch (error) {
      res.status(400).send("Invalid request body");
    }
  },

  // Add a new connection to a user
  async addConnection(req, res) {
    try {
      const { connectionId } = req.body;
      const userId = req.params.id;

      // Validate ObjectId
      if (
        !mongoose.Types.ObjectId.isValid(connectionId) ||
        !mongoose.Types.ObjectId.isValid(userId)
      ) {
        return res.status(400).send("Invalid connectionId or userId");
      }

      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).send("User not found");
      }

      // Check if connectionId already exists in connections
      const existingConnection = user.connections.find((conn) =>
        conn.connectionId.equals(connectionId)
      );

      if (existingConnection) {
        return res.status(400).send("Connection already exists");
      }

      // Add the new connection
      user.connections.push({ connectionId });
      await user.save();

      res.status(201).send({ connectionId });
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  },

  // Delete a connection by ID
  async deleteConnection(req, res) {
    try {
      const userId = req.params.id;
      const connectionId = req.params.connectionId;

      // Validate ObjectId
      if (
        !mongoose.Types.ObjectId.isValid(userId) ||
        !mongoose.Types.ObjectId.isValid(connectionId)
      ) {
        return res.status(400).send("Invalid userId or connectionId");
      }

      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).send("User not found");
      }

      // Find the connection index by connectionId
      const connectionIndex = user.connections.findIndex((conn) =>
        conn.connectionId.equals(connectionId)
      );

      if (connectionIndex === -1) {
        return res.status(404).send("Connection not found");
      }

      // Remove the connection using the index
      user.connections.splice(connectionIndex, 1);
      await user.save();

      res.send({ message: "Connection deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  },
};

export default UserController;
