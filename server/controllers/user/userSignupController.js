const { User } = require('../../models/userModel');
const { cryptoSha } = require('../securityController');

async function registerUser(fullName, email, password) {
  try {
    // Create new user
    const newUser = new User({
      fullName: fullName,
      email: email,
      password: password
    });

    // Save user to database
    const savedUser = await newUser.save();
    // Return the saved user
    return savedUser;
  } catch (error) {
    // Handle any errors
    console.error('Error registering user:', error);
    throw error;
  }
}

const userSignup = async (req, res) => {
  const { fullName, email, password, confirmPassword } = req.body;
  const pw = cryptoSha(password);

  try {
    // Check if passwords match
    if (password !== confirmPassword) {
      throw new Error('Passwords do not match');
    }

    // Check if the email already exists (case-insensitive)
    const existingUser = await User.findOne({ email: { $regex: new RegExp(email, 'i') } });
    if (existingUser) {
      throw new Error('Email already exists');
    }

    // Create new user
    const newUser = await registerUser(fullName, email, pw);

    // Redirect to signup success page
    res.status(200).send("Register successful");
    console.log('User registered successfully');
  } catch (error) {
    if (error.message === 'Passwords do not match') {
      res.status(400).send('Passwords do not match');
    } else if (error.message === 'Email already exists') {
      res.status(401).send('Email already exists');
    } else {
      console.error('Error during signup:', error);
      res.status(500).send('Internal server error');
    }
  }
};

module.exports = { userSignup };
