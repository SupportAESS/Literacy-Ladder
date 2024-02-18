const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    Name: String,
    Email: String,
    MobileNo: Number
});

module.exports = mongoose.model('User', userSchema);