const { Cart } = require("../../models/userModel")

const deleteItem = async (req, res) => {
    const { book } = req.body;

    try {
        // Delete the cart item
        await Cart.updateOne({}, { $pull: { cartItems: { book: book } } });
        res.status(200).json({ message: 'Cart item deleted successfully' });
    } catch (error) {
        console.error('Error deleting cart item:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = { deleteItem };