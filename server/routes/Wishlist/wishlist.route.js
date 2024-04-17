const express = require('express');
const router = express.Router();
const {addToWishlist} = require('../../controllers/Wishlist/addToWishlist.js');

router.post("/", addToWishlist);

module.exports = router;