const extendSchema = require('mongoose-extend-schema');

const User = mongoose.models('User');

const storeOwnerSchema = extendSchema(User, {
    phone: { type: String },
    stores: { type: [Number], default: [] },
});

module.exports = mongoose.model('StoreOwner', storeOwnerSchema);