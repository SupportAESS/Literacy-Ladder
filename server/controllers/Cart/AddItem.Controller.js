const { Cart } = require("../../models/userModel.js");

const addToCart = async (req, res) => {
    console.log("Hello");
    console.log(req.body);
    try {
        // Find the user's cart
        let userCart = await Cart.findOne({ userId: req.body.userId });

        if (!userCart) {
            // If the user's cart doesn't exist, create a new cart
            userCart = new Cart({
                userId: req.body.userId,
                cartItems: [{
                    item: req.body.cartItem.item,
                    quantity: 1
                }]
            });
        } else {
            // Check if the item is already in the cart
            const existingItem = userCart.cartItems.find(item => item.item.equals(req.body.cartItem.item));

            if (existingItem) {
                // If the item is already in the cart, increase the quantity
                existingItem.quantity += 1;
            } else {
                // If the item is not in the cart, add it to the cartItems array
                userCart.cartItems.push({
                    item: req.body.cartItem.item,
                    quantity: 1
                });
            }
        }

        // Save the updated cart
        await userCart.save();
        console.log("Item added to cart");

        return res.status(200).send("success");
    } catch (error) {
        console.error("Error adding item to cart: ", error);
        return res.status(500).send("Error adding item to cart");
    }
};

module.exports = { addToCart };
