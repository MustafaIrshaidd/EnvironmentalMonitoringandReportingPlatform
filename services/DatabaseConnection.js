import mongoose from "mongoose";

class SingletonDatabaseConnection {
  constructor() {
    if (!SingletonDatabaseConnection.instance) {
      this.connect();
      SingletonDatabaseConnection.instance = this;
    }
    return SingletonDatabaseConnection.instance;
  }

  connect() {
    mongoose
      .connect("mongodb://0.0.0.0:27017/EcoTrack")
      .then((result) => {
        console.log("Database Connected successfully");
      })
      .catch((err) => {
        console.log("Failed to connect to the database");
      });
  }
}

const databaseConnection = new SingletonDatabaseConnection();

export default databaseConnection;
