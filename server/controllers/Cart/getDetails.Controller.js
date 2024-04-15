const { Cart } = require("../../models/userModel.js");

const getDetails = async (req, res) => {
    try {
        const userId = req.query;
        const cart = await Cart.findOne(userId).populate('cartItems.book');
        
        if (!cart) {
            return res.status(200).send("Your Cart is Empty");
        } else {
            const data = cart.cartItems;
            return res.status(200).send(data);
        }
    } catch (err) {
        console.error(err);
        return res.status(500).send("Internal Server Error");
    }
}

module.exports = {getDetails};