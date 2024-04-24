const { Order, Book } = require("../../models/userModel.js");
const Razorpay = require("razorpay");

const orderPlace = async (req, res) => {
    try {
        const { userId, addressId, paymentMethod, cartItems, totalAmount, paymentStatus } = req.body;

        const razorpay = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_KEY_SECRET
        });

        const options = {
            "amount": totalAmount
        }
        const order = await razorpay.orders.create(options);

        if (!order) {
            return res.status(400).send("Bad Request");
        }

        // Create a new order document
        const newOrder = new Order({
            userId: userId,
            addressId: addressId,
            paymentMethod: paymentMethod,
            cartItems: cartItems,
            totalAmount: totalAmount,
            paymentStatus: paymentStatus,
            paymentId: order.id,
            orderStatus: "confirm",
            timeStamp: new Date() // Setting the current time
        });        

        // Save the order to the database
        const savedOrder = await newOrder.save();

        // Extract order ID from the saved order
        const orderId = savedOrder._id;
        const orderIdString = orderId.toString();
        const orderDetail = {
            paymentId: order.id,
            orderId: orderIdString
        }

        // Update book quantities
        await updateBookQuantities(cartItems);

        // Respond with order details
        res.status(200).json(orderDetail);
    } catch (error) {
        console.error("Error placing order:", error);
        res.status(500).json({ error: "Failed to place order. Please try again later." });
    }
};

// Function to update book quantities
async function updateBookQuantities(cartItems) {
    try {
        for (const item of cartItems) {
            const bookId = item.bookId;
            const quantity = item.quantity;

            // Find the book by ID
            const book = await Book.findById(bookId);
            console.log(book);
            // Check if the book exists
            if (!book) {
                throw new Error(`Book not found with ID: ${bookId}`);
            }

            // Update the book quantity
            book.bookQuantity -= quantity;

            // Save the updated book
            await book.save();
        }
    } catch (error) {
        console.error("Error updating book quantities:", error);
        throw error;
    }
}

module.exports = { orderPlace };
