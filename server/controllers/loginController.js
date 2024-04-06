const { User } = require('../models/userModel');
const { cryptoSha } = require('./securityController')

async function validateUser(username, password) {
  try {
    // Find user by username
    const user = await User.findOne({ username: username });

    // If user not found, return null
    if (!user) {
      return null;
    }

    // Validate password
    const isValidPassword = await User.findOne({ password: password});

    // If password is invalid, return null
    if (!isValidPassword) {
      return null;
    }

    // If username and password are valid, return the user
    return user;
  } catch (error) {
    // Handle any errors
    console.error('Error validating user:', error);
    throw error;
  }
}

const Login = async (req, res) => {
  const { username, password } = req.body;
  var pw = cryptoSha(password);
  console.log("Login clicked with username: " + username + " and password: " + pw);
  
  try {
    // Validate username and password
    const user = await validateUser(username, pw);

    if (user) {
      // Set session variables
      req.session.username = username;
      req.session.loggedIn = true;
      res.json({ message: 'Login successful', session: req.session })
    } else {
      res.status(401).send('Invalid username or password');
    }
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).send('Internal server error');
  }
};

module.exports = { Login };
