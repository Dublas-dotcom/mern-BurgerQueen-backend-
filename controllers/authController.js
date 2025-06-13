const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// REGISTER Controller
exports.registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // 1. Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ msg: 'User already exists' });

    // 2. Hash password
    const salt = await bcrypt.genSalt(10); // Think: adds random noise to make hash stronger
    const hashedPassword = await bcrypt.hash(password, salt);

    // 3. Save user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();
    res.status(201).json({ msg: 'User created', user: savedUser._id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// LOGIN Controller
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Find user by email
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: 'Email not found' });

    // 2. Check password match
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'incorrect password' });
    // 3. Create JWT token
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '2d' }
    );

    // 4. Return user info + token
    res.json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
