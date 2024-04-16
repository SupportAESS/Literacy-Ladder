const { Order } = require("../../models/userModel.js");

const orderPlace = async (req, res) => {
    try {
        //console.log(req.body);
        // Assuming request body contains all necessary data for creating an order
        const { userId, addressId, paymentMethod, cartItems, totalAmount, paymentStatus } = req.body;
        
        // Validate request data if needed

        // Create a new order document
        const newOrder = new Order({
            userId: userId,
            addressId: addressId,
            paymentMethod: paymentMethod,
            cartItems: cartItems,
            totalAmount: totalAmount,
            paymentStatus: paymentStatus
        });

        // Save the order document to the database
        const savedOrder = await newOrder.save();

        // Send the order ID in the response
        res.status(200).json({ orderId: savedOrder._id });
    } catch (error) {
        console.error("Error placing order:", error);
        res.status(500).json({ error: "Failed to place order. Please try again later." });
    }
};

module.exports = { orderPlace };

