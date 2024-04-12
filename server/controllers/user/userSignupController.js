const { User } = require('../../models/userModel');
const { cryptoSha } = require('../securityController');

async function registerUser(fullName, email, password, confirmPassword) {
  try {
    // Check if passwords match
    if (password !== confirmPassword) {
      throw new Error('Passwords do not match');
    }

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
  const cpw = cryptoSha(confirmPassword);

  console.log("Signup clicked with full name: " + fullName + ", email: " + email +  ", and password: "+ pw + ", confirm-password: "+  cpw);

  try {
    // Create new user
    const newUser = await registerUser(fullName, email, pw, cpw);

    // Redirect to signup success page
    res.send("Register successful");
    console.log('User registered successfully');
  } catch (error) {
    if (error.message === 'Passwords do not match') {
      res.status(400).send('Passwords do not match');
    } else if (error.code === 11000 && error.keyPattern && error.keyPattern.email === 1) {
      res.status(400).send('Email already exists');
    } else {
      console.error('Error during signup:', error);
      res.status(500).send('Internal server error');
    }
  }
};

module.exports = { userSignup };
