import User from "../models/user.model.js";
import mongoose from "mongoose";

const UserController = {
  // Get a user by ID
  async getUserByID(req, res) {
    try {
      const user = await User.findById(req.params.id);
      if (!user) {
        return res.status(404).send("User not found");
      }
      res.send(user);
    } catch (error) {
      res.status(500).send("Internal server error");
    }
  },

  // Add a new user
  async addUser(req, res) {
    try {
      const { username, name, password } = req.body;
      const user = new User({
        username,
        name,
        password,
      });
      await user.save();
      res.status(201).send(user);
    } catch (error) {
      res.status(400).send("Invalid request body");
    }
  },

  // Delete a user by ID
  async deleteUserByID(req, res) {
    try {
      const user = await User.findByIdAndDelete(req.params.id);
      if (!user) {
        return res.status(404).send("User not found");
      }
      res.send(user);
    } catch (error) {
      res.status(500).send("Internal server error");
    }
  },

  // Update a user by ID
  async updateUserByID(req, res) {
    try {
      const { username, name, password } = req.body;
      const updatedUser = await User.findByIdAndUpdate(req.params.id, {
        username,
        name,
        password,
      });
      if (!updatedUser) {
        return res.status(404).send("User not found");
      }
      res.send(updatedUser);
    } catch (error) {
      res.status(400).send("Invalid request body");
    }
  },

  // Add an interest
  async addInterest(req, res) {
    try {
      const { intreset } = req.body;
      const user = await User.findById(req.params.id);

      if (user) {
        const newInterest = { intreset }; // Create a new interest object
        user.interests.push(newInterest);
        await user.save();
        res.status(201).send(newInterest);
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
      const user = await User.findById(req.params.id);
      if (!user) {
        return res.status(404).send("User not found");
      }
      const { interestId } = req.params;
      const index = user.interests.findIndex(
        (interest) => interest._id.toString() === interestId
      );
      if (index === -1) {
        return res.status(404).send("Interest not found");
      }
      user.interests.splice(index, 1);
      await user.save();
      res.send({ message: "Interest deleted successfully" });
    } catch (error) {
      res.status(500).send("Internal server error");
    }
  },

  // Update an interest by ID
  async updateInterest(req, res) {
    try {
      const { interest } = req.body;
      const user = await User.findById(req.params.id);
      if (!user) {
        return res.status(404).send("User not found");
      }
      const { interestId } = req.params;
      const existingInterest = user.interests.find(
        (interest) => interest._id.toString() === interestId
      );
      if (!existingInterest) {
        return res.status(404).send("Interest not found");
      }
      existingInterest.intreset = interest;
      await user.markModified("interests");
      await user.save();
      res.send(existingInterest);
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
