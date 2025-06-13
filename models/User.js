const e = require('cors');
const mongoose = require('mongoose');
const { use } = require('react');

// mongoose schema = blueprint for a document
const userShema = new mongoose.userShema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
},{timestamps: true});

exports = mongoose.model('User', userShema);
// mongoose.model = creates a model from the schema