const mongoose = require('mongoose');
const extendSchema = require('mongoose-extend-schema');

const User = mongoose.models('User');

const userSchema = extendSchema(User , {
    phone: { type: String },
    favoriteProducts: { type: [Number], default: [] },
    latestProducts: { type: [Number], default: [] },
});

module.exports = mongoose.model('NormalUser', userSchema);