const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const error = require("../utilities/errorFunction")

const options = { discriminatorKey: 'kind' };

const userSchema = mongoose.Schema({
    id: { type: Number, unique: true },
    name: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    // otp: {
    //     type: String,
    //     required: true,
    // },
}, options);

userSchema.discriminator('NormalUser',
    new mongoose.Schema({
        phone: { type: String },
        favoriteProducts: { type: [Number], default: [] },
        latestProducts: { type: [Number], default: [] },
    }, options));


userSchema.discriminator('StoreOwner',
    new mongoose.Schema({
        phone: { type: String },
        stores: { type: [Number], default: [] },
    }, options));

userSchema.discriminator('AdminUser',
    new mongoose.Schema({}, options));

userSchema.methods.getJWT = function () {
    const today = new Date();
    const exp = new Date(today);
    exp.setDate(today.getDate() + 60);
    return jwt.sign({
        userId: this.id,
        email: this.email,
        exp: parseInt(exp.getTime() / 1000),
    }, "secret");
};



module.exports = mongoose.model('User', userSchema);