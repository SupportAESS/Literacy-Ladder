const express = require("express");
const router = express.Router();

const {ResetPassword} = require("../../controllers/user/resetPasswordController");

router.post("/", ResetPassword);

module.exports = router