const express = require('express')
const { addToCart } = require("../../controllers/Cart/AddItem.Controller.js");
const { getDetails } = require("../../controllers/Cart/getDetails.Controller.js");
const router = express.Router();

router.post('/', addToCart);
router.get('/', getDetails);

module.exports = router;

