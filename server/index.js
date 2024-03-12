const express = require('express');
const server = express();
const http = require('http');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const connectionOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: 'literacyLadder',
};


//for admin routes
const adminRoute = require('./routes/admin.js');
server.use('/admin', adminRoute);

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
server.use(bodyParser.urlencoded({ extended: true }));

// Parse JSON bodies (as sent by API clients)
server.use(bodyParser.json());

// Handle POST request to /submit
server.post('/submit', (req, res) => {
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
  insertBookData(bookName, author, genre, productPrice, productQuantity, productType, productDescription);

  res.send('Data received successfully!');
});

const User = require('./models/userModel'); // Import the User model from userModel.js
const { Book } = require('./models/userModel.js'); // Import the Book model from models.js

async function insertBookData(bookName, author, genre, productPrice, productQuantity, productType, productDescription) {
  try {
    // Create a new document with the provided data
    const newBook = new Book({
      bookName,
      author,
      genre,
      productPrice,
      productQuantity,
      productType,
      productDescription
    });

    // Save the new document to the database
    await newBook.save();

    console.log("Book inserted successfully");
  } catch (error) {
    console.error("Error inserting book:", error);
  }
}


mongoose.connect(connectionUri, connectionOptions)
.then(() => {
  console.log("Database Connected");
})
.catch(err => console.error(err));



http.createServer(server).listen(8080, function (req, res) {
  console.log('HTTP server listening on port 8080');
});
