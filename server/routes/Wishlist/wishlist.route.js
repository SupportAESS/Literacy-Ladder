const express = require('express');
const router = express.Router();
const {addToWishlist} = require('../../controllers/Wishlist/addToWishlist.js');
const {getWishlist} = require("../../controllers/Wishlist/getWishlist.js");
const {deleteWishlisteItem} = require("../../controllers/Wishlist/deleteWishlistItem.js")
router.post("/", addToWishlist);
router.get("/", getWishlist);
router.delete("/",deleteWishlisteItem);

module.exports = router;