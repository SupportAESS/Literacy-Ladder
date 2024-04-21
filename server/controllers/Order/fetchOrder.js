const { Order, UserAddress } = require("../../models/userModel");

const Orders = async (req, res) => {
    try {
        const { userId } = req.query;
        //console.log(userId);
        // Fetch orders for the given userId
        const orders = await Order.find({ userId: userId }).populate('cartItems.bookId');

        // Iterate through each order and fetch the corresponding address details
        const ordersWithAddresses = await Promise.all(orders.map(async (order) => {
            // Fetch the corresponding address details using the addressId from the order
            const address = await UserAddress.findOne({ 'addresses._id': order.addressId });
            // Extract the specific address object based on the addressId
            // const specificAddress = address.addresses.find(addr => addr._id.toString() === order.addressId);

            // Combine the order details with the address details
            return {
                ...order.toObject(), // Convert Mongoose document to plain JavaScript object
                address: address
            };
        }));
            if (ordersWithAddresses !== null) {
                return res.status(200).send(ordersWithAddresses);
            }
            else {
                return res.status(400).send({ error: "No Orders found" });
            }
        } catch (error) {
            console.error("Error fetching order:", error);
            res.status(500).json({ error: "Failed to find order. Please try again later." });
        }
    }

module.exports = { Orders };