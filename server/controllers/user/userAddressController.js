const { UserAddress, User } = require('../../models/userModel');

const userAddressSave = async (req, res) => {
  try {
    // Check if _id exists in the User collection
    const user = await User.findById(req.body.refUser);
    if (!user) {
      return res.status(404).send('User not found');
    }

    // Check if user address already exists
    let userAddress = await UserAddress.findOne({ refUser: req.body.refUser });

    if (!userAddress) {
      // If user address doesn't exist, create a new one
      userAddress = new UserAddress({
        refUser: req.body.refUser,
        addresses: [],
        mobileNumber: '',
        alternativeMobileNumber: ''
      });
    }

    // Add new address
    const newAddress = {
      street: req.body.street,
      city: req.body.city,
      state: req.body.state,
      country: req.body.country,
      postalCode: req.body.postalCode,
      isDefault: req.body.isDefault
    };

    // Ensure only one address is marked as default
    if (newAddress.isDefault) {
      userAddress.addresses.forEach(address => {
        address.isDefault = false;
      });
    }

    userAddress.addresses.push(newAddress);

    // Set the latest mobile number and alternative mobile number
    userAddress.mobileNumber = req.body.mobileNumber;
    userAddress.alternativeMobileNumber = req.body.alternativeMobileNumber;

    // Save the user address
    await userAddress.save();

    res.status(200).send("Address added successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  }
};

const userAddressGet = async (req, res) =>{
    try{

    }catch(e){

    }
};

module.exports = { userAddressSave, userAddressGet };
