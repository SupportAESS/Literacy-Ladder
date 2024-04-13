const express = require("express");
const router = express.Router();

const {userAddressSave, userAddressGet} = require("../../controllers/user/userAddressController");

//const session = require("express-sessiion");

//const bodyParser = require("body-parser");

router.post("/userAddressSave", userAddressSave);
router.get("/userAddressGet", userAddressGet);

module.exports = router;