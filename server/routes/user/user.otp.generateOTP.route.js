const express = require("express");
const router = express.Router();

const {generateOTP} = require("../../controllers/user/generateOTPController");

router.post("/", generateOTP);

module.exports = router