const exports = require('express');
const router = exports.Router();
const { registerUser,loginUser} = require('../controllers/authController');

//post request to register a user
router.post('/register', registerUser);

//post request to login a user
router.post('/login', loginUser);

module.exports = router;
// Export the router to be used in the main application