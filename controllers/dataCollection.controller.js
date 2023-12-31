import DataCollection from "../models/dataCollection.model.js";
import User from "../models/user.model.js";

const dataCollectionController = {
    // Get a dataCollection by ID
    async getdataCollectionByID(req, res) {
        try {
            const dataCollection = await DataCollection.findById(req.params.id);
            if (!dataCollection) {
                return res.status(404).send("dataCollection not found");
            }
            res.send(dataCollection);
        } catch (error) {
            res.status(500).send("Internal server error");
        }
    },

    // Add a new dataCollection
    async adddataCollection(req, res) {
        try {
            const { data_type, value } = req.body;
            const created_at = Date.now();
            const user_id = req.params.id;
            const dataCollectionToAdd = new DataCollection({
                data_type,
                value,
                created_at,
                user_id
            });
            await dataCollectionToAdd.save();
            const user = await User.findById(user_id);

            if (user) {
                user.sustainability_score+=10;
                user.contributions.push(dataCollectionToAdd);
                await user.save();
            } else {
                // Handle the case where the user with the given ID is not found
                return res.status(404).send('User not found');
            }

            res.status(201).send(dataCollectionToAdd);
        } catch (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
        }

    },

    // Delete a dataCollection by ID
    async deleteDataCollectionByID(req, res) {
        try {
            const dataCollection = await DataCollection.findByIdAndDelete(req.params.id);
            if (!dataCollection) {
                return res.status(404).send("dataCollection not found");
            }
            const user = await User.findById(dataCollection.user_id);
            if(user) {  
                const existingIndex = user.contributions.findIndex(
                    dataCollection => dataCollection._id.toString() === req.params.id
                  );
                          
                  // If the existing DataCollection is found, remove it
                  if (existingIndex !== -1) {
                    user.contributions.splice(existingIndex, 1);
                    await user.save();
                  }
            }
            res.send(dataCollection);
        } catch (error) {
            res.status(500).send("Internal server error");
        }
    },

    // Update a dataCollection by ID
    async updateDataCollectionByID(req, res) {
        try {
            const { data_type, value } = req.body;
            const updatedDataCollection = await DataCollection.findByIdAndUpdate(
                req.params.id,
                { data_type, value },
            );
            if (!updatedDataCollection) {
                return res.status(404).send("Collection not found");
            }
            
            const user = await User.findById(updatedDataCollection.user_id);

            if (user) {
              // Find the index of the existing DataCollection in contributions array
              const existingIndex = user.contributions.findIndex(
                updatedDataCollection => updatedDataCollection._id.toString() === req.params.id
              );
                      
              // If the existing DataCollection is found, remove it
              if (existingIndex !== -1) {
                user.contributions.splice(existingIndex, 1);
                user.contributions.push(updatedDataCollection);
                await user.save();
              }
              res.status(201).send(updatedDataCollection);
            } else {
              // Handle the case where the user with the given ID is not found
              return res.status(404).send('User not found');
            }


            
        } catch (error) {
            res.status(400).send("Invalid request body");
        }
    },
};

export default dataCollectionController;
