var express = require('express');
var router = express.Router();
const User = mongoose.model('User');
const error = require("../utilities/errorFunction");
const authorization = require('../middlewares/user-auth');


router.put('/update', authorization, function (req, res, next) {
    const { email, name, phone, password } = req.body;
    if (!name || !email || !password || !phone) {
        return error(res, "Name, email, phone or password is empty", 400);
    }
    const existUser = await (User.findOne({ email }));
    if(existUser) return error(res, "Email already exist", 401);

    const user = await (User.findOne({ emial: req.user.email }));
    user.name = name;
    user.email = email;
    user.phone = phone;
    user.password = password;
    user.save();
    
    return res.status(200).json({  message: "successful" });
});

module.exports = router;
