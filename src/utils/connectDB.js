const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    if (mongoose.connections[0].readyState) {
      console.log('MongoDB is already connected');
      return;
    }
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      family: 4, 
    });
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error; 
  }
};

module.exports = connectDB;
