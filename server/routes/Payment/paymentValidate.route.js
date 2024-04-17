const express = require('express')
const { paymentValidate } = require("../../controllers/Payment/paymentValidate.Controller");

const router = express.Router();

router.post('/', paymentValidate);

module.exports = router;