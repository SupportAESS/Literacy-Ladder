const express = require("express");
const router = express.Router();

const {userLogin} = require("../../controllers/user/userLoginController");

//const session = require("express-sessiion");

//const bodyParser = require("body-parser");

router.post("/userLogin", userLogin);

module.exports = router;