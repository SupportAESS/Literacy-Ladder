const express = require("express");
const router = express.Router();

const {userSignup} = require("../../controllers/user/userSignupController");

router.post("/", userSignup);

module.exports = router