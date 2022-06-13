const extendSchema = require('mongoose-extend-schema');

const User = mongoose.models('User');

const adminUserSchema = extendSchema(User, {});

module.exports = mongoose.model('AdminUser', adminUserSchema);