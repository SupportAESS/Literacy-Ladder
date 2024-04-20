const express = require('express');
const server = express();
// const http = require('http');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const cors = require('cors');
const Razorpay = require("razorpay");
require("dotenv").config();

//Routes
const bookRoute = require('./routes/Book/book.route.js');
const getLoginRoute = require('./routes/admin/login.route.js');
const getSignUpRoute = require('./routes/admin/signup.route.js');
const userLoginRoute = require('./routes/user/user.login.route.js');
const userSignupRounte = require('./routes/user/user.signup.route.js');
const userAddressSaveRoute = require('./routes/user/user.address.save.route.js');
const wishlistRoute = require('./routes/Wishlist/wishlist.route.js');
const paymentRoute = require('./routes/Payment/paymentValidate.route.js')
const cartRoute = require('./routes/Cart/Cart.route.js');
const orderRoute = require('./routes/Order/Order.route.js');

// Allow requests from the frontend server
server.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3001'],
  credentials: true // Enable credentials (cookies, authorization headers, etc.)
}));


const connectionOptions = {
  // useNewUrlParser: true,
  // useUnifiedTopology: true,
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

//Admin 
//Login System
server.use('/', getLoginRoute);

//SignUp System
server.use('/',getSignUpRoute);

//Google SignIn System


// server.use(bodyParser.urlencoded());
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Book

//Add Book
server.use('/addBook', bookRoute);
//Remove Book
server.use('/removeBook', bookRoute);
//View Book
server.use('/viewBook', bookRoute);
//UpdateBook
server.use('/updateBookDetails', bookRoute);

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Cart

//Add Book To Cart
server.use('/addToCart', cartRoute);

//Get Cart Details
server.use('/getCartDetails', cartRoute);

//Update Cart Details
server.use("/updateCartItem", cartRoute);

//Delete Cart item
server.use('/deleteCartItem', cartRoute);
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//Add to Wishlist
server.use("/addToWishlist", wishlistRoute);

//Get Wishlist Data
server.use("/getWishlist", wishlistRoute);

//Deleted wishlisted item
server.use("/deleteWishlistItem", wishlistRoute);


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//OrderConfirmation and Payment
server.use('/orderPlace', orderRoute);
server.use('/deleteOrder', orderRoute);
server.use('/confirmOrder', orderRoute);

//Fetch Order Data
server.use("/getOrders", orderRoute);

//Payment
server.use('/validate', paymentRoute);

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//user
server.use('/userLogin', userLoginRoute);
server.use('/userSignup', userSignupRounte);
server.use('/userAddressSave', userAddressSaveRoute);
server.use('/userAddressGet', userAddressSaveRoute);
server.use('/deleteAddress', userAddressSaveRoute);

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
