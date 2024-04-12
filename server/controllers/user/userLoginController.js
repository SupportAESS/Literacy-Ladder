const { User } = require('../../models/userModel');
const { cryptoSha } = require('../securityController')

async function validateUser(email, password) {
  try {
    // Find user by email
    const user = await User.findOne({ email: email });

    // If user not found, return null
    if (!user) {
      return null;
    }

    // Validate password
    const isValidPassword = user.password === password;

    // If password is invalid, return null
    if (!isValidPassword) {
      return null;
    }

    // If email and password are valid, return the user
    return user;
  } catch (error) {
    // Handle any errors
    console.error('Error validating user:', error);
    throw error;
  }
}

const userLogin = async (req, res) => {
  const { email, password } = req.body;
  const pw = cryptoSha(password);
  console.log("Login clicked with email: " + email + " and password: " + pw);
  
  try {
    // Validate email and password
    const user = await validateUser(email, pw);

    if (user) {
      // Set session variables
      req.session.user = user;
      req.session.loggedIn = true;
      res.json({ message: 'Login successful', session: req.session })
    } else {
      res.status(401).send('Invalid email or password');
    }
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).send('Internal server error');
  }
};

module.exports = { userLogin };
