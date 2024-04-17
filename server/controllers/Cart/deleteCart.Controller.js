const { Cart } = require("../../models/userModel")

const deleteItem = async (req, res) => {
    const { userId, item } = req.body;

    try {
        // Delete the cart item
        // console.log("Inside");
        // console.log(item.book);
        // console.log(userId);
        const response = await Cart.updateOne({userId:userId}, { $pull: { cartItems: { book: item.book} } });
        //console.log(response);
        //console.log("Completed");
        return res.status(200).json({ message: 'Cart item deleted successfully' });
    } catch (error) {
        console.error('Error deleting cart item:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = { deleteItem };