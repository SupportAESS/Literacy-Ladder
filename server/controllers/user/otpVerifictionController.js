const { OTP } = require('../../models/userModel');

const otpVerification = async (req, res) => {
    try {
        const { email, otp } = req.body;
        
        // Check if both email and OTP are provided
        if (!email || !otp) {
            return res.status(400).json({ message: "Email and OTP are required." });
        }

        // Find the OTP document for the provided email
        const otpRecord = await OTP.findOne({ email }).exec();

        // Check if OTP record exists
        if (!otpRecord) {
            return res.status(404).json({ message: "OTP not found. Please request a new OTP." });
        }

        // Check if OTP matches
        if (otpRecord.otp !== otp) {
            return res.status(400).json({ message: "Invalid OTP. Please try again." });
        }

        // Check if OTP is expired
        const now = new Date();
        if (otpRecord.createdAt < now - 5 * 60 * 1000) { // 5 minutes in milliseconds
            // OTP expired
            return res.status(400).json({ message: "OTP expired. Please request a new OTP." });
        }

        // If OTP is valid and not expired, you can perform further actions (e.g., user authentication)

        // Optionally, you can delete the OTP record after successful verification
        await OTP.deleteOne({ email });

        // Respond with success message
        return res.status(200).json({ message: "OTP verification successful." });
    } catch (error) {
        console.error("Error verifying OTP:", error);
        return res.status(500).json({ message: "Internal server error." });
    }
};

module.exports = { otpVerification };

