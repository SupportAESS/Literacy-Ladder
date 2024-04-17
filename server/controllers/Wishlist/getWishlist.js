const { Wishlist } = require("../../models/userModel.js");

const getWishlist = async (req, res) => {
    try {
        const { userId } = req.query;

        // Find wishlist items for the given userId
        const wishlistItems = await Wishlist.find({ userId }).populate('books');
        return res.status(200).send(wishlistItems[0].books);
    } catch (error) {
        console.error("Error fetching wishlist items: ", error);
        return res.status(500).send({ error: "Internal server error" });
    }
};

module.exports = {getWishlist};