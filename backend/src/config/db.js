const mongoose = require("mongoose");

let cachedConnection = null;

const connectDB = async () => {
  if (cachedConnection) {
    return cachedConnection;
  }

  if (!process.env.MONGODB_URI) {
    throw new Error("MONGODB_URI environment variable is missing.");
  }

  try {
    mongoose.set("bufferCommands", false);

    const opts = {
      bufferCommands: false,
    };

    cachedConnection = await mongoose.connect(process.env.MONGODB_URI, opts);
    console.log("MongoDB connected successfully via cached connection.");
    return cachedConnection;
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw error;
  }
};

module.exports = connectDB;
