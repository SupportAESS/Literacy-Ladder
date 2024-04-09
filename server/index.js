const express = require('express');
const server = express();
const http = require('http');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const cors = require('cors');


// Set 'ejs' as the view engine
server.set('view engine', 'ejs');


// Allow requests from the frontend server
server.use(cors({
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



//Login System
const { Login } = require('./controllers/loginController.js')
server.post('/login', Login);

//SignUp System
const { Signup } = require('./controllers/signupController.js');
server.post('/signup',Signup);



//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////admin 
// Example protected route
// Specify the directory where your views are located
server.set('views', __dirname + '/view');

server.get('/', (req, res) => {
  res.render('index', { title: 'Home Page', message: 'Welcome to my website!' });
});
server.get('/admin', (req, res) => {
  // Check if user is logged in
  if (req.session.loggedIn) {
    // User is logged in, render the dashboard
    res.render('admin', { title: 'Home Page', message: 'Welcome to my website!' });
    //res.sendFile(__dirname + '/view/admin.html');
  } else {
    // User is not logged in, redirect to login page
    res.redirect('/');
  }
});
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Handle POST request to /submit
const { AddBooks } = require('./controllers/bookController.js');
server.post('/addBooks', AddBooks);

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
