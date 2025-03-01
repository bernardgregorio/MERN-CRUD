import mongoose from "mongoose";
import { logger } from "../utils/loggerUtils.js";

const uri = process.env.MONGO_URI || "mongodb://mongo:27017/mydatabase";

const db = async () => {
  try {
    await mongoose.connect(uri);
    logger.info("Connected to MongoDB");
  } catch (error) {
    logger.error("Error connecting to MongoDB: ", error);
  }
};

export default db;
