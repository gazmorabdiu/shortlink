const express = require('express');

const connectDB = require('./database/connectDb'); 




const app = express();
const port = 3000;



// Import route files
const linkRoutes = require('./routes/links');

// // Middleware for parsing JSON
app.use(express.json());

// Serve static files from the "public" directory
app.use(express.static('public'));

// Set EJS as the template engine
app.set('view engine', 'ejs');

app.set('views', './views');



// Use routes

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // Allow all origins
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE'); // Allow specific methods
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // Allow specific headers
  next();
})
app.use('/', linkRoutes);


// Handle 404
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Connect to MongoDB
connectDB().then(() => {
  // Only start the server if MongoDB connection is successful
  app.listen(port, () => {
    console.log(`Server running on port ${port} `);
  });
}).catch(err => {
  console.error('Failed to connect to MongoDB:', err.message);
  process.exit(1); // Exit the process with failure
});
