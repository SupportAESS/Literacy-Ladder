const { Cart } = require("../../models/userModel.js");

const getDetails = async (req,res) => {
    console.log(req.query);
    return res.status(200).send("Success");
}

module.exports = {getDetails};