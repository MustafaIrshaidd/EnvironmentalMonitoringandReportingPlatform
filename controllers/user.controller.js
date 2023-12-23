import User from "../models/user.model.js";

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
};

export default UserController;
