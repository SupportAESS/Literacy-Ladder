const { Cart } = require("../../models/userModel.js");

const addToCart = async (req, res) => {
    const { userId, book, quantity} = req.body;
    //console.log(req.body);
    try {
        let userCart = await Cart.findOne({ userId });
        //console.log(userCart);
        if (userCart === null) {
            // userCart = new Cart({
            //     userId: req.body.userId,
            //     cartItems: [{
            //         book: req.body.cartItem.item,
            //         quantity: 1
            //     }]
            // });
            //console.log("inside");
            await Cart.create({
                userId,
                cartItems:[{book,quantity}]
            })
            console.log(userCart);
        } else {
            const existingItemIndex = userCart.cartItems.findIndex(item => item.book.equals(book));

            if (existingItemIndex !== -1) {
                userCart.cartItems[existingItemIndex].quantity += 1; // Increase quantity if item already exists
            } else {
                userCart.cartItems.push({
                    book: book,
                    quantity: 1
                }); // Add item to cartItems array
            }
            await userCart.save();
        }

        //await userCart.save();
        console.log("Item added to cart");

        return res.status(200).send("success");
    } catch (error) {
        console.error("Error adding item to cart: ", error);
        return res.status(500).send("Error adding item to cart");
    }
};


module.exports = { addToCart };
