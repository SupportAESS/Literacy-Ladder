const { Order } = require("../../models/userModel.js");
const Razorpay = require("razorpay");

const orderPlace = async (req, res) => {
    try {
        //console.log(req.body);
        // Assuming request body contains all necessary data for creating an order
        const { userId, addressId, paymentMethod, cartItems, totalAmount, paymentStatus } = req.body;
        const razorpay = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_KEY_SECRET
        });
        const options = {
            "amount": totalAmount
        }
        const order = await razorpay.orders.create(options);

        if(!order){
            return res.status(400).send("Bad Request");
        }
        // Validate request data if needed

        // Create a new order document
        const newOrder = new Order({
            userId: userId,
            addressId: addressId,
            paymentMethod: paymentMethod,
            cartItems: cartItems,
            totalAmount: totalAmount,
            paymentStatus: paymentStatus,
            paymentId: order.id
        });

        // Save the order document to the database
        const savedOrder = await newOrder.save();

        // Send the order ID in the response
        const orderId = savedOrder._id;
        const orderIdString = orderId.toString();
        const orderDetail = {
            paymentId: order.id,
            orderId: orderIdString
        }
        res.status(200).json(orderDetail);
    } catch (error) {
        console.error("Error placing order:", error);
        res.status(500).json({ error: "Failed to place order. Please try again later." });
    }
};

module.exports = { orderPlace };

