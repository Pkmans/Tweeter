const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    createdAt: String,
    profile: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Profiles'
    }
})

module.exports = mongoose.model('User', userSchema);