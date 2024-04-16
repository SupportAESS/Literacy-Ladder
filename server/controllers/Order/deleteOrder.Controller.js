const { Order } = require("../../models/userModel.js");

const deleteOrder = async (req, res) => {
    try {
        // Extract the order ID from the request parameters
        const orderId = req.body.orderId;
        //console.log(orderId);
        // Find and delete the corresponding order document
        const deletedOrder = await Order.findByIdAndDelete(orderId);

        if (!deletedOrder) {
            // If no order found with the given ID, send a 404 Not Found response
            return res.status(400).json({ error: "Order not found" });
        }

        // If deletion was successful, send a success response
        res.status(200).json({ message: "Order deleted successfully" });
    } catch (error) {
        // If any error occurs during the process, send a 500 Internal Server Error response
        console.error("Error deleting order:", error);
        res.status(500).json({ error: "Failed to delete order. Please try again later." });
    }
};

module.exports = { deleteOrder };


