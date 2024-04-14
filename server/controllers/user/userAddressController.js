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
      isDefault: req.body.isDefault,
      mobileNumber: req.body.mobileNumber,
      alternativeMobileNumber: req.body.alternativeMobileNumber
    };

    // Ensure only one address is marked as default
    if (newAddress.isDefault) {
      userAddress.addresses.forEach(address => {
        address.isDefault = false;
      });
    }

    userAddress.addresses.push(newAddress);

    // Save the user address
    await userAddress.save();

    res.status(200).send("Address added successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  }
};

const userAddressGet = async (req, res) => {
  try {
    // Assuming you're using some kind of database or external service to fetch the user's address based on userId
    const userId = req.query.userId; // Extract userId from query parameters
    const userAddress = await fetchUserAddress(userId); // Fetch user address data based on userId

    // Assuming fetchUserAddress returns an object with the user's address data
    if (userAddress) {
      // If user address data is found, send it back in the response
      res.status(200).json({ ok: true, address: userAddress });
    } else {
      // If user address data is not found, send a 404 Not Found response
      res.status(404).json({ ok: false, error: 'User address not found' });
    }
  } catch (e) {
    // Handle any errors that occur during the process
    console.error('Error fetching user address:', e);
    res.status(500).json({ ok: false, error: 'Internal server error' });
  }
};

// Example function to fetch user address data based on userId
const fetchUserAddress = async (userId) => {
  try {
    // Query the UserAddress model to find the user address data by userId
    const userAddressData = await UserAddress.findOne({ refUser: userId });

    // Return the user address data if found
    return userAddressData;
  } catch (error) {
    // Handle any errors that occur during the database query
    console.error('Error fetching user address:', error);
    throw error; // Rethrow the error to be caught by the caller
  }
};


module.exports = { userAddressSave, userAddressGet };
