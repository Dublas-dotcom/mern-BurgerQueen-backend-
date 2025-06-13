const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

// Create an Express application
const app = express();
app.use(cors());
app.use(express.json());

//connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
.then(() => {console.log('Connected to MongoDB');})
.catch((error) => {
    console.error('Error connecting to MongoDB:', error);
});

//port
const PORT = process.env.PORT || 5000;
// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
// Define a simple route
app.get('/', (req, res) => {
    res.send('Welcome to the Burger Queen API');
});
const authRouter = require('./routes/auth');
app.use('/auth', authRouter);