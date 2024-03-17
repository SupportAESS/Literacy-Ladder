const express = require("express");
const path = require('path');
const addProduct =  express();

//const session = require("express-sessiion");

//const bodyParser = require("body-parser");

addProduct.use(express.static(path.join(__dirname, 'view')));

addProduct.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../view/admin.html'));
  });

module.exports = addProduct;