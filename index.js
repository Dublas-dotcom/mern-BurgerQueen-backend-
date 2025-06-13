const express = required('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const { dot } = require('node:test/reporters');
// Load environment variables from .env file
dotenv.config();

// Create an Express application
const app = express();
app.use(cors());
app.use(express.json());

//connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
.then(() => {console.log('Connected to MongoDB');})
.catch((error) => {
    console.error('Error connecting to MongoDB:', error);
});

// Define a simple route
const authRouter = require('./routes/auth');
app.use('/auth', authRouter);