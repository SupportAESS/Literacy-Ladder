const express = require("express");
const router = express.Router();

const {Signup} = require("../controllers/signupController.js");

router.post("/signup", Signup);

module.exports = router