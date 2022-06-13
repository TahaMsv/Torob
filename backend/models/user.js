const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    id: { type: Number, unique: true },
    name: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    favoriteProducts: { type: [Number], default: [] },
    latestProducts: { type: [Number], default: [] },
});

module.exports = mongoose.model('User', userSchema);