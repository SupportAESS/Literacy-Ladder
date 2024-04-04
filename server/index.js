const express = require('express');
const server = express();
const http = require('http');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const crypto = require('crypto');
const cors = require('cors');

// Allow requests from the frontend server
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true // Enable credentials (cookies, authorization headers, etc.)
}));

const connectionOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: 'literacyLadder',
};

// Middleware setup
server.use(bodyParser.json()); // Add this line to parse JSON data
server.use(session({
  secret: 'your-secret-key', // Change this to a secret key for session encryption
  resave: false,
  saveUninitialized: true
}));


//for admin routes
const adminRoute = require('./routes/admin.js');
server.use(express.static("view"));

//server.use('/admin', adminRoute);

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
server.use(bodyParser.urlencoded({ extended: true }));

// Parse JSON bodies (as sent by API clients)
server.use(bodyParser.json());

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

///sha224
function cryptoSha(password) {  
  //creating hash object 
  var hash = crypto.createHash('sha224');
  //passing the data to be hashed
  data = hash.update(password);
  //Creating the hash in the required format
  gen_hash= data.digest('hex');
  //Printing the output on the console
  console.log("hash : " + gen_hash);
  return gen_hash;
}

//Login System
const loginRoute = require('./routes/login.js');
const { validateUser } = require('./controllers/loginController.js');

server.post('/login', async (req, res) => {
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
      res.send('Login successful');
    } else {
      res.status(401).send('Invalid username or password');
    }
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).send('Internal server error');
  }
});


const signupRoute = require('./routes/signup.js');
const { registerUser } = require('./controllers/signupController.js');


server.post('/signup', async (req, res) => {
  const { username, email, role, password, confirmPassword } = req.body;
    var pw = cryptoSha(password);
    var cpw = cryptoSha(confirmPassword);

  console.log("Signup clicked with username: " + username + ", email: " + email + ", role: " + role + " and password: "+ pw + "  confirm-password: "+  cpw);


  try {
    // Create new user
    const newUser = await registerUser(username, email, role, pw, cpw);

    // Redirect to signup success page
    res.sendFile(__dirname + '/view/index.html');
  } catch (error) {
    if (error.message === 'Passwords do not match') {
      res.status(400).send('Passwords do not match');
    } else {
      console.error('Error during signup:', error);
      res.status(500).send('Internal server error');
    }
  }
});



//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////admin 
// Example protected route
server.get('/admin', (req, res) => {
  // Check if user is logged in
  if (req.session.loggedIn) {
    // User is logged in, render the dashboard
    res.sendFile(__dirname + '/view/admin.html');
  } else {
    // User is not logged in, redirect to login page
    res.redirect('/');
  }
});
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Handle POST request to /submit
const addProduct = require('./routes/addProduct.js');
const bookController = require('./controllers/bookController.js');
server.post('/addProduct', (req, res) => {
  const { bookName, author, productPrice, productQuantity, productType, genre, productDescription } = req.body;
  
  // Here you can process the received data as needed
  // For this example, I'm just logging it to the console
  console.log('Received data:', {
    bookName,
    author,
    productPrice,
    productQuantity,
    productType,
    genre,
    productDescription
  });

  // Respond with a success message
  bookController.insertBookData(bookName, author, genre, productPrice, productQuantity, productType, productDescription);

  res.send('Data received successfully!');
});

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//  connect database
const User = require('./models/userModel'); // Import the User model from userModel.js
const connectionUri = "mongodb+srv://shivendra2023is21:xl1XseRiuLs88wKf@literacyladder.kkfnufu.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(connectionUri, connectionOptions)
.then(() => {
  console.log("Database Connected");
})
.catch(err => console.error(err));


//server create
http.createServer(server).listen(2211, function (req, res) {
  console.log('HTTP server listening on port 2211');
});
