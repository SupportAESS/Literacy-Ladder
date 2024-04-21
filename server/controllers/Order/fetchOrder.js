const { Order }  = require("../../models/userModel");

const Orders = async(req, res) => {
    try {
        const {userId} = req.query;
        console.log(userId);
        const response = await Order.find({userId:userId}).populate('cartItems');
        console.log(response);
        if(response!==null){
            return res.status(200).json(response);
        }
        else{
            return res.status(400).json({ error: "No Orders found" });
        }
    } catch (error) {
        console.error("Error fetching order:", error);
        res.status(500).json({ error: "Failed to find order. Please try again later." });
    }
}

module.exports = {Orders};