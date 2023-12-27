import DataCollection from "../models/dataCollection.model.js";
import User from "../models/user.model.js";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const dataCollectionController = {
  // Get a dataCollection by ID
  async getdataCollectionByID(req, res) {
    try {
      const dataCollection = await prisma.data.findUnique({
        where: { id: parseInt(req.params.id) },
      });
      //const user = await User.findById(req.params.id);
      if (!dataCollection) {
        return res.status(404).send("User not found");
      }
      res.send(dataCollection);
    } catch (error) {
      res.status(500).send("Internal server error");
    }
  },

  // Get all the data
  async getAllData(req, res) {
    try {
      const dataCollections = await DataCollection.find().select("-user_id");
      if (!dataCollections || dataCollections.length === 0) {
        return res.status(404).send("No dataCollections found");
      }
      res.send(dataCollections);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal server error");
    }
  },

  // Add a new dataCollection
  async adddataCollection(req, res) {
    try {
      const { data_type, value } = req.body;
      const created_at = new Date();
      const user_id = parseInt(req.params.id);

      const dataCollectionToAdd = await prisma.data.create({
        data: {
          data_type,
          value,
          created_at,
          user: {
            connect: {
              id: user_id,
            },
          },
        },
      });
      const user = await prisma.user.findUnique({
        where: {
          id: user_id,
        },
      });

      if (!user) {
        return res.status(404).send("User not found");
      }
      console.log(user.sustainability_score);
      const newScore = user.sustainability_score + 10;
      console.log(newScore);

      await prisma.user.update({
        where: {
          id: user_id,
        },
        data: {
          sustainability_score: newScore,
        },
      });
      res.status(201).send(dataCollectionToAdd);
      const alert = await prisma.alert.findUnique({ where: { alert_type: data_type } });
      if (alert != null) {
        if (value >= alert.threshold) {
          await prisma.alert.update({
            where: {
              alert_type: data_type,
            },
            data: {
              isActive: true,
            },
          });
        }
      }
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  },

  // Delete a dataCollection by ID
  async deleteDataCollectionByID(req, res) {
    try {
      const dataFromPrisma = await prisma.data.delete({
        where: { id: parseInt(req.params.id) },
      });
      if (!dataFromPrisma) {
        return res.status(404).send("data not found");
      }
      res.send(dataFromPrisma);
    } catch (error) {
      res.status(500).send("Internal server error");
    }
  },

  // Update a dataCollection by ID
  async updateDataCollectionByID(req, res) {
    try {
      const { data_type, value } = req.body;
      console.log(data_type,value);
      const updatedDataCollectionWithPrisma = await prisma.data.update({
        where: { id: parseInt(req.params.id) },
        data: { data_type, value },
      });
      if (!updatedDataCollectionWithPrisma) {
        return res.status(404).send("Data not found");
      }
      const alertToUpdate = await prisma.alert.findMany({ where: { alert_type: data_type } });
      if (alertToUpdate != null) {
       const alert= alertToUpdate[0];
       let bool= false;
        if (value >= alert.threshold) {
           bool=true;
        }
          console.log("Alert is active");
          await prisma.alert.update({
            where: {
              id: alert.id
            },
            data: {
              isActive: bool
            }
          })
        } 
      
      res.send(updatedDataCollectionWithPrisma);

    } catch (error) {
      console.log(error);
      res.status(400).send("Invalid request body");
    }
  },
};

export default dataCollectionController;
