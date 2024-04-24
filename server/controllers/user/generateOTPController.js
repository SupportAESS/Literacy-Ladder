const { OTP } = require('../../models/userModel');

const generateOTP = async (req, res) => {
    try {
        const { email } = req.body;

        // Generate a random 6-digit OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString();

        // Save the OTP along with the user's email in the database
        await OTP.create({ email, otp });

        // Optionally, you can send the OTP to the user via email

        // Respond with success message and OTP
        return res.status(200).json({ message: "OTP generated successfully.", otp });
    } catch (error) {
        console.error("Error generating OTP:", error);
        return res.status(500).json({ message: "Internal server error." });
    }
};

module.exports = { generateOTP };

