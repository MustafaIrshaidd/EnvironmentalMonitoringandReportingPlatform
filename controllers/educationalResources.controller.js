import ResourceModel from "../models/educationalResources.model.js";

const ResourceController = {
  // Get all resources
  async getResources(req, res) {
    try {
      const resources = await ResourceModel.find();
      res.json(resources);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },

  // Get a specific resource by ID
  async getResourceByID(req, res) {
    try {
      const resource = await ResourceModel.findById(req.params.id);
      if (!resource) {
        return res.status(404).json({ message: "Resource not found" });
      }
      res.json(resource);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },

  // Create a new resource
  async addResource(req, res) {
    try {
      const newResource = new ResourceModel(req.body);
      const savedResource = await newResource.save();
      res.status(201).json(savedResource);
    } catch (error) {
      console.error(error);
      res.status(400).json({ message: "Invalid request body" });
    }
  },

  // Update a resource by ID
  async updateResourceByID(req, res) {
    try {
      const updatedResource = await ResourceModel.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      if (!updatedResource) {
        return res.status(404).json({ message: "Resource not found" });
      }
      res.json(updatedResource);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },

  // Delete a resource by ID
  async deleteResourceByID(req, res) {
    try {
      const deletedResource = await ResourceModel.findByIdAndDelete(
        req.params.id
      );
      if (!deletedResource) {
        return res.status(404).json({ message: "Resource not found" });
      }
      res.json(deletedResource);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
};

export default ResourceController;
