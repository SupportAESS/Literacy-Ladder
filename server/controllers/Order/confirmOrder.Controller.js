const { Order } = require('../../models/userModel');

const confirmOrder = async (req, res) => {
    try {
        // Extract the payment ID from the request body
        const paymentId = req.body.data.paymentId;

        // Find the order using the payment ID
        const order = await Order.findOne({ paymentId });

        if (!order) {
            // If the order is not found, return an error response
            return res.status(404).json({ error: "Order not found" });
        }

        // Update payment status to 'confirm'
        order.paymentStatus = 'confirm';

        // Save the updated order
        await order.save();

        // Return a success response
        return res.status(200).json({ message: "Payment status updated successfully" });
    } catch (error) {
        // Handle errors
        console.error("Error confirming order:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
};

module.exports = { confirmOrder };
