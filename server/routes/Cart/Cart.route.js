const express = require('express')
const { addToCart } = require("../../controllers/Cart/AddItem.Controller.js");
const { getDetails } = require("../../controllers/Cart/getDetails.Controller.js");
const { updateCart } = require("../../controllers/Cart/updateCart.Controller.js");
const { deleteItem } = require("../../controllers/Cart/deleteCart.Controller.js")
const router = express.Router();

router.post('/', addToCart);
router.get('/', getDetails);
router.put('/', updateCart);
router.delete('/',deleteItem);

module.exports = router;

