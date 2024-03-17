const express = require("express");
const path = require('path');
const adminRoute =  express();

//const session = require("express-sessiion");

//const bodyParser = require("body-parser");

adminRoute.use(express.static(path.join(__dirname, 'view')));

adminRoute.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../view/admin.html'));
  });

module.exports = adminRoute;