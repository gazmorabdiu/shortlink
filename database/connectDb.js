const mongoose = require('mongoose');

// Replace with your MongoDB URI
const MONGO_URI = 'mongodb+srv://test:W5UGl6LgrcMf0mzE@cluster0.7mqrf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'; 

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected successfully');
  } catch (err) {
    console.error('Error connecting to MongoDB:', err.message);
    process.exit(1); // Exit the process with failure
  }
};

module.exports = connectDB;
