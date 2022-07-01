const extendSchema = require('mongoose-extend-schema');
const mongoose = require('mongoose');
const User = require('../models/user');

const storeOwnerSchema = extendSchema(User, {
    phone: { type: String },
    stores: { type: [Number], default: [] },
});

module.exports = mongoose.model('StoreOwner', storeOwnerSchema);