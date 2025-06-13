const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Register a new user
exports.registerUaer = async (request, response) => {
    try {
        // destructure the request body
        const {username, email, password} = request.body;
        // Validate input
        if (!username || !email || !password) {
            return response.status(400).json({message: 'All fields are required'});
        }
        // Check if user already exists
        const existingUser = await User.findOne({email});
        if (existingUser) {
            return response.status(400).json({message: 'User already exists'});
        }
        // Hash the password
        const Salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, Salt);
        // Create a new user
        const newUser = new User({
            username,
            email,
            password: hashedPassword
        })
        const savedUser = await newUser.save();
       response.status(201).json({ message: 'User registered successfully', user: savedUser });

              
    }
    catch (error) {
        console.error('Error registering user: Controller ', error);
        response.status(500).json({ message: 'Internal server error' });
    }
}
// Login a user
exports.loginUser = async (request, response) => {
    try {
        // destructure the request body
        const { email, password } = request.body;
        // Validate input
        if (!email || !password) {
            return response.status(400).json({ message: 'Email and password are required' });
        }
        // Check if user exists
        const user = await User.findOne({ email });
        if (!user){
            return response.status(400).json({ message: 'Invalid email or password' });
        }
        // Check password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return response.status(400).json({ message: 'Invalid email or password' });
        }
        // Create JWT token
        const token = jwt.sign(
            { id: user._id },
             process.env.JWT_SECRET,
            { expiresIn: '1h' });
        // Return success response
        response.status(200).json({
            message: 'Login successful',
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            },
            token
        });
    }
    catch (error) {
        console.error('Error logging in user: Controller ', error);
        response.status(500).json({ message: 'Internal server error' });
    }
}
