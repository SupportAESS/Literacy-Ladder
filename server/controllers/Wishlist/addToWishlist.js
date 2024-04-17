const { Wishlist } = require("../../models/userModel.js");

const addToWishlist = async (req, res) => {
    try {
        const { userId, bookId } = req.body;

        // Check if user already has a wishlist entry
        let wishlist = await Wishlist.findOne({ userId });

        if (!wishlist) {
            // If user doesn't have a wishlist entry, create a new one
            wishlist = new Wishlist({
                userId,
                books: [bookId]
            });
        } else {
            // If user already has a wishlist entry, update the books field
            if (!wishlist.books.includes(bookId)) {
                // Add the bookId to the wishlist if it's not already included
                wishlist.books.push(bookId);
            }
        }

        // Save the updated/created wishlist entry
        await wishlist.save();

        res.status(200).json({ success: true, message: "Wishlist updated successfully" });
    } catch (error) {
        console.error("Error adding to wishlist:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

module.exports = {addToWishlist};