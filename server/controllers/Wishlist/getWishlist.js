const { Wishlist } = require("../../models/userModel.js");

const getWishlist = async (req, res) => {
    try {
        const { userId } = req.query;
        const exist = await Wishlist.find({ userId });
        if (exist !== null) {
            const wishlistItems = await Wishlist.find({ userId }).populate('books');
            return res.status(200).send(wishlistItems[0].books);
        }
        else{
            return res.status(404).send({message: "User don't have any wishlist"})
        }
        // Find wishlist items for the given userId

    } catch (error) {
        console.error("Error fetching wishlist items: ", error);
        return res.status(500).send({ error: "Internal server error" });
    }
};

module.exports = { getWishlist };