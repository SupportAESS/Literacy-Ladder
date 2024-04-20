const express = require('express')
const { orderPlace } = require("../../controllers/Order/orderPlace.Controller");
// const { getDetails } = require("../../controllers/Cart/getDetails.Controller.js");
const { confirmOrder } = require("../../controllers/Order/confirmOrder.Controller");
const { deleteOrder } = require("../../controllers/Order/deleteOrder.Controller");
const { Orders } = require("../../controllers/Order/fetchOrder");
const router = express.Router();

router.post('/', orderPlace);
router.get('/', Orders);
router.put('/', confirmOrder);
router.delete('/', deleteOrder);

module.exports = router;