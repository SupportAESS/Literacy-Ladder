const express = require('express')
const { searchBook } = require("../../controllers/Search/searchBook.Controller");
const router = express.Router();

router.get('/', searchBook);

module.exports = router;