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

//for admin routes
const adminRoute = require('./routes/admin.js');
server.use('/admin', adminRoute);

mongoose.connect(connectionUri, connectionOptions)
.then(() => {
  console.log("Database Connected");
})
.catch(err => console.error(err));



    
http.createServer(server).listen(8080, function (req, res) {
  console.log('HTTP server listening on port 8080');
});
