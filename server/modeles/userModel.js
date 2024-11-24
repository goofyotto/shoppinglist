const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true, // odebere whitespace // mezery
    },
    password: {
        type: String,
        required: true,
    },
    admin: {
        type: Boolean,
        required: false,
        default: false,
    },
});

module.exports = mongoose.model('User', userSchema);