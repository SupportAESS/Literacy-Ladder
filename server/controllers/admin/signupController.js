const { Admin } = require('../../models/userModel');
const { cryptoSha } = require('../securityController');

async function registerUser(username, email, password, confirmPassword) {
  try {
    // Check if passwords match
    if (password !== confirmPassword) {
      throw new Error('Passwords do not match');
    }

    // Create new user
    const newUser = new Admin({
      username: username,
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

const Signup = async (req, res) => {
  const { username, email, password, confirmPassword } = req.body;
    var pw = cryptoSha(password);
    var cpw = cryptoSha(confirmPassword);

  console.log("Signup clicked with username: " + username + ", email: " + email +  " and password: "+ pw + "  confirm-password: "+  cpw);


  try {
    // Create new user
    const newUser = await registerUser(username, email, pw, cpw);

    // Redirect to signup success page
    res.send("register successful");
    console.log('yes');
  } catch (error) {
    if (error.message === 'Passwords do not match') {
      res.status(400).send('Passwords do not match');
    } else {
      console.error('Error during signup:', error);
      res.status(500).send('Internal server error');
    }
  }
};

module.exports = { Signup };

