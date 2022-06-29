const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const error = require("../utilities/errorFunction")

const userSchema = mongoose.Schema({
    id: { type: Number, unique: true },
    name: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String },
});


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

userSchema.methods.validatePassword = function (password) {
    if (this.password !== password) return error(res, "wrong password", 400);
};


module.exports = mongoose.model('User', userSchema);