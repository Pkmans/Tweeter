const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    bio: String,
    username: String,
    email: String,
    phone: String,
    school: String,
    location: String,
    createdAt: String,
    birthDate: String,
    relationship: String
})

module.exports = mongoose.model('Profile', profileSchema);