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

server.use(express.static("FronEndAdmin"));

mongoose.connect(connectionUri, connectionOptions)
  .then(() => {
    console.log("Database Connected");
    //insert(); // Call insert function once the database is connected
    getData(); // Call getData function once the database is connected
  })
  .catch(err => console.error(err));

const User = require('./models/userModel'); // Import the User model from userModel.js

async function insert(name, email, mobileNo) {
  try {
    await User.create({
      Name: name,
      Email: email,
      MobileNo: mobileNo
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
    
  } catch (error) {
    console.error("Error getting data:", error);
  }
}

http.createServer(server).listen(8080, function (req, res) {
  console.log('HTTP server listening on port 8080');
});

/*server.get('/', (req, res) => {
  res.render('./FronEndAdmin/');
});*/

