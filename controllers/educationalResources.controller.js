import ResourceModel from "../models/educationalResources.model.js";
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient();

const ResourceController = {
  // Get all resources
  async getResources(req, res) {
    try {
      const resource = await prisma.resource.findMany();
      //const user = await User.findById(req.params.id);
      if (!resource) {
        return res.status(404).send("no resources found");
      }
      res.status(200).send(resource);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal server error");
    }
  },
  async getResourcesForUser(req, res) {
    try {
      const resource = await prisma.resource.findMany({where:{userid: req.params.id}});
      //const user = await User.findById(req.params.id);
      if (!resource) {
        return res.status(404).send("no resources found");
      }
      res.status(200).send(resource);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal server error");
    }
  },


  // Get a specific resource by ID
  async getResourceByID(req, res) {
    try {
      const resource = await prisma.resource.findUnique({
        where: { id: parseInt(req.params.id) },
      });
      if (!resource) {
        return res.status(404).json({ error: "Community resource not found" });
      }
      res.json(resource);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  },

  // Create a new resource
  async addResource(req, res) {
    try {
      const { title, content } = req.body;
      const user_id = parseInt(req.params.id);
      const created_at = new Date(Date.now());
      const resource = await prisma.resource.create({
        data: { title, content, user_id, created_at },
      });
      res.status(201).send(resource);
    } catch (error) {
      console.log(error);
    }
  },

  // Update a resource by ID
  async updateResourceByID(req, res) {
    try {
      const { title, content } = req.body;

      const updatedResource = await prisma.resource.update({
        where: { id: parseInt(req.params.id) },
        data: {
          title,
          content,
        },
      });

      if (!updatedResource) {
        return res.status(404).json({ error: "resource not found" });
      }

      res.json(updatedResource);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  },

  // Delete a resource by ID
  async deleteResourceByID(req, res) {
    try {
      const deletedResource = await prisma.resource.delete({
        where: { id: parseInt(req.params.id) },
      });

      if (!deletedResource) {
        return res.status(404).json({ error: "resource not found" });
      }
      res.json(deletedResource);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  },
};

export default ResourceController;
