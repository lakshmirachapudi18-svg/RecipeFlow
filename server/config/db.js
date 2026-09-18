const mongoose = require('mongoose');

let isConnected = false;

const connectDB = async () => {
  if (isConnected) return true;

  const mongoURI = process.env.MONGODB_URI;
  if (!mongoURI || mongoURI.trim() === '') {
    console.warn('⚠️ MONGODB_URI is not set in environment variables. Using in-memory dataset mode.');
    return false;
  }

  try {
    const conn = await mongoose.connect(mongoURI);
    isConnected = true;
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    return true;
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    console.warn('⚠️ Operating in fallback in-memory dataset mode.');
    return false;
  }
};

const getIsConnected = () => isConnected;

module.exports = { connectDB, getIsConnected };
