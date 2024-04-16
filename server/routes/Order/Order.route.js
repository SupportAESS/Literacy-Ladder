const express = require('express')
const { orderPlace } = require("../../controllers/Order/orderPlace.Controller");
// const { getDetails } = require("../../controllers/Cart/getDetails.Controller.js");
// const { updateCart } = require("../../controllers/Cart/updateCart.Controller.js");
const { deleteOrder } = require("../../controllers/Order/deleteOrder.Controller")
const router = express.Router();

router.post('/', orderPlace);
// router.get('/', getDetails);
// router.put('/', updateCart);
router.delete('/', deleteOrder);

module.exports = router;