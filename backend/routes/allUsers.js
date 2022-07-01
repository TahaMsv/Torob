const mongoose = require('mongoose');
var express = require('express');
var router = express.Router();
const User = mongoose.model('User');
const NormalUser = mongoose.model('NormalUser');
const AdminUser = mongoose.model('AdminUser');
const error = require("../utilities/errorFunction");
const authorization = require('../middlewares/user-auth');


router.put('/update', authorization, async function (req, res, next) {
    const { email, name, phone, password } = req.body;
    if (!name || !email || !password || !phone) {
        return error(res, "Name, email, phone or password is empty", 400);
    }
    const existUser = await (User.findOne({ email }));
    if (existUser && email != req.user.email) return error(res, "Email already exist", 401);

    const user = await (User.findOne({ emial: req.user.email }));
    user.name = name;
    user.email = email;
    user.phone = phone;
    user.password = password;
    user.save();

    return res.status(200).json({ message: "successful" });
});

router.get('/getuserdetails', authorization, async function (req, res, next) {

    let user = await (NormalUser.findOne({ emial: req.user.email }));
    if (!user) user = await (AdminUser.findOne({ emial: req.user.email }));
    if (!user) return error(res, "User not found", 401);
    return res.status(200).json({
        email: user.email,
        username: user.name,
        password: user.password,
        phone: user.phone
    });

});

module.exports = router;
