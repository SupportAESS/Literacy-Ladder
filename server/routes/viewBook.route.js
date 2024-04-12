const express = require("express");
const router = express.Router();
const {ViewBooks} = require('../controllers/book.ViewController');

router.get("/viewBook", ViewBooks);

module.exports = router;