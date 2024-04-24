const { User, OTP } = require('../../models/userModel');
const { cryptoSha } = require('../securityController');

async function verifyOTP(email, otpInput) {
  try {
    // Find the OTP document for the provided email
    const otpRecord = await OTP.findOne({ email: { $regex: new RegExp(email, 'i') } }).exec();

    // Check if OTP record exists
    if (!otpRecord) {
      return { status: 'error', message: 'OTP not found. Please request a new OTP.' };
    }

    // Check if OTP matches
    console.log(otpInput, otpRecord.otp);
    if (otpRecord.otp !== otpInput) {
      return { status: 'error', message: 'Invalid OTP. Please try again.' };
    }

    // Check if OTP is expired (assuming OTPs are valid for 5 minutes)
    const now = new Date();
    if (otpRecord.createdAt < now - 5 * 60 * 1000) { // 5 minutes in milliseconds
      return { status: 'error', message: 'OTP expired. Please request a new OTP.' };
    }

    // OTP verification successful
    return { status: 'success', message: 'OTP verification successful.' };
  } catch (error) {
    console.error('Error verifying OTP:', error);
    return { status: 'error', message: 'Internal server error.' };
  }
}

async function ResetPassword(req, res) {
  const { email, password, otp } = req.body; // Assuming the client sends these parameters in the request body
  console.log(req.body);
  try {
    // Find the user by email
    const user = await User.findOne({ email: { $regex: new RegExp(email, 'i') } });
    console.log(user);
    // Check if the user exists
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Verify OTP
    const otpVerificationResult = await verifyOTP(email, otp);

    // Check if OTP verification was successful
    if (otpVerificationResult.status !== 'success') {
      // If OTP verification failed, return appropriate error message
      return res.status(400).json({ success: false, message: otpVerificationResult.message });
    }

    // Update user's password
    user.password = cryptoSha(password);
    await user.save();

    // Return success message
    return res.status(200).json({ success: true, message: 'Password reset successfully' });
  } catch (error) {
    console.error('Error resetting password:', error);
    return res.status(500).json({ success: false, message: 'An error occurred. Please try again later.' });
  }
}

module.exports = { ResetPassword };
