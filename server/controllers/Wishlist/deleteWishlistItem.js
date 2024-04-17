const { Wishlist } = require("../../models/userModel.js");

const deleteWishlisteItem = async (req, res) => {
    const { userId, item } = req.body;
    //console.log(item);
    try {
        // Delete the cart item
        // console.log("Inside");
        // console.log(item.book);
        // console.log(userId);
        const response = await Wishlist.updateOne({userId:userId}, { $pull: { books: item._id } });
        //console.log(response);
        //console.log("Completed");
        return res.status(200).json({ message: 'Cart item deleted successfully' });
    } catch (error) {
        console.error('Error deleting cart item:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {deleteWishlisteItem};