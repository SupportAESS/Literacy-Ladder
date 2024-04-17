const { Cart } = require("../../models/userModel")

const deleteItem = async (req, res) => {
    const { userId, book } = req.body;

    try {
        // Delete the cart item
        // console.log("Inside");
        //console.log(req.body);
        //const search = await Cart.findOne({userId:userId});
        //console.log(search);
        const response = await Cart.findOneAndUpdate(
            {userId: userId}, 
            { $pull: { cartItems: { book: book } } });
        console.log(response);
        console.log("Completed");
        return res.status(200).json({ message: 'Cart item deleted successfully' });
    } catch (error) {
        console.error('Error deleting cart item:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = { deleteItem };