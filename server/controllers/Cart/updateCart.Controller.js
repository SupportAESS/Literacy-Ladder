const { Cart } = require('../../models/userModel');

const updateCart = async (req, res) => {
    const { book, quantity } = req.body;
  
    try {
      // Update the quantity of the cart item
      await Cart.findOneAndUpdate({ 'cartItems.book': book }, { $set: { 'cartItems.$.quantity': quantity } });
      // console.log("Updated Successfully");
      res.status(200).json({ message: 'Cart item quantity updated successfully' });
    } catch (error) {
      console.error('Error updating cart item quantity:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {updateCart};