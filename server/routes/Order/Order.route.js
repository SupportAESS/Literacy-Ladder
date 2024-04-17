const express = require('express')
const { orderPlace } = require("../../controllers/Order/orderPlace.Controller");
// const { getDetails } = require("../../controllers/Cart/getDetails.Controller.js");
const { confirmOrder } = require("../../controllers/Order/confirmOrder.Controller");
const { deleteOrder } = require("../../controllers/Order/deleteOrder.Controller");
const router = express.Router();

router.post('/', orderPlace);
// router.get('/', getDetails);
router.put('/', confirmOrder);
router.delete('/', deleteOrder);

module.exports = router;