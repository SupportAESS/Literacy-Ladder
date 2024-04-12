const express = require("express");
const router = express.Router();

const {Login} = require("../../controllers/admin/loginController.js");

//const session = require("express-sessiion");

//const bodyParser = require("body-parser");

router.post("/login", Login);

module.exports = router;