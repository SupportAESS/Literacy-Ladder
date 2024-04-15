const express = require("express");
const router = express.Router();

const {userAddressSave, userAddressGet, deleteAddress} = require("../../controllers/user/userAddressController");

//const session = require("express-sessiion");

//const bodyParser = require("body-parser");

router.post("/", userAddressSave);
router.get("/", userAddressGet);
router.delete("/", deleteAddress);

module.exports = router;