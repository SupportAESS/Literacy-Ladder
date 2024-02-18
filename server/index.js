const express = require('express');
const server = express();
const http = require('http');
const mongoose = require('mongoose');

const connectionOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: 'literacyLadder',
};

const connectionUri = "mongodb+srv://shivendra2023is21:xl1XseRiuLs88wKf@literacyladder.kkfnufu.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(connectionUri, connectionOptions)
  .then(() => {
    console.log("Database Connected");
    insert(); // Call insert function once the database is connected
    getData(); // Call getData function once the database is connected
  })
  .catch(err => console.error(err));

const User = require('./models/userModel'); // Import the User model from userModel.js

async function insert() {
  try {
    await User.create({
      Name: "Shivendra Singh Thakur",
      Email: "Shivendra323@gmail.com",
      MobileNo: 8435963744
    });
    console.log("User inserted successfully");
  } catch (error) {
    console.error("Error inserting user:", error);
  }
}

async function getData() {
  try {
    const users = await User.find({});
    console.log(users);
    server.get('/', (req, res) => {
      res.send(users);
    });
  } catch (error) {
    console.error("Error getting data:", error);
  }
}

http.createServer(server).listen(8080, function (req, res) {
  console.log('HTTP server listening on port 8080');
});
