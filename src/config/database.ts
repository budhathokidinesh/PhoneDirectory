import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
const connectDB = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is not defined in environment variables");
    }

    await mongoose.connect(process.env.MONGO_URI);

    console.log("Database connection successful");
  } catch (error) {
    console.error("Database connection failed:");
    process.exit(1); // Exit the process if the database connection fails
  }
};

export default connectDB;
