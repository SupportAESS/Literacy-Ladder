const express = require("express");
const router = express.Router();

const {otpVerification} = require("../../controllers/user/otpVerifictionController");

router.post("/", otpVerification);

module.exports = router