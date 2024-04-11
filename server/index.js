const express = require('express');
const server = express();
// const http = require('http');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const addBookRoute = require('./routes/book.route.js');
const getLoginRoute = require('./routes/login.route.js');
const getSignUpRoute = require('./routes/signup.route.js')
const cors = require('cors');


// // Set 'ejs' as the view engine
// server.set('view engine', 'ejs');


// Allow requests from the frontend server
server.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3001'],
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


// var urlencodedParser = bodyParser.urlencoded({ extended: false })


//Login System
server.use('/', getLoginRoute);

//SignUp System
server.use('/',getSignUpRoute);

// server.use(bodyParser.urlencoded());

//Add, remove Book
server.use('/', addBookRoute);

// server.post('/addBook', (req, res)=>{
//   console.log(req.body)
//   res.send("success")
// })

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//  connect database
const connectionUri = "mongodb+srv://shivendra2023is21:xl1XseRiuLs88wKf@literacyladder.kkfnufu.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(connectionUri, connectionOptions)
.then(() => {
  console.log("Database Connected");
})
.catch(err => console.error(err));


//server create
server.listen(2211, ()=> {
  console.log('HTTP server listening on port 2211');
});
