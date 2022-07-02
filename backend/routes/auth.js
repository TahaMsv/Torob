var router = require('express').Router();
const mongoose = require("mongoose");
const User = mongoose.model('User');
const NormalUser = mongoose.model('NormalUser');
const AdminUser = mongoose.model('AdminUser');
const StoreOwner = mongoose.model('StoreOwner');
const error = require("../utilities/errorFunction");
const { generateOTP, sendSMS } = require('../servises/otp');


router.post('/signup', async (req, res, next) => {
    const { email, name, phone, password, userType, stores } = req.body;
    if (!name || !email || !password) {
        return error(res, "Name, email or password is empty", 400);
    }
    let newUser;
    // let otpGenerated;
    if (userType === "normal") {
        const otherSameUser = await (NormalUser.findOne({ email }));
        if (otherSameUser) return error(res, "Email already exist", 401);
        const newUserId = await User.count() + 1;

        // otpGenerated = generateOTP();
        newUser = new NormalUser({
            id: newUserId,
            name,
            email,
            password,
            phone,
            // otp: otpGenerated
        });

    } else if (userType === "admin") {
        const otherSameUser = await (AdminUser.findOne({ email }));
        if (otherSameUser) return error(res, "Email already exist", 401);
        const newUserId = await User.count() + 1;
        // otpGenerated = generateOTP();
        newUser = new AdminUser({
            id: newUserId,
            name,
            email,
            password,
            // otp: otpGenerated
        });
    } else if (userType === "shopOwner") {
        const otherSameUser = await (StoreOwner.findOne({ email }));
        if (otherSameUser) return error(res, "Email already exist", 401);
        const newUserId = await User.count() + 1;
        // otpGenerated = generateOTP();
        newUser = new StoreOwner({
            id: newUserId,
            name,
            email,
            password,
            phone,
            // otp: otpGenerated
        });
        if (stores) {
            stores.map(store => newUser.stores.push(store));
        }
    }
    else {
        return error(res, "userType does not exist", 401);
    }

    // console.log("here66");
    // try {
    //     console.log("here68");
    //     await sendSMS({
    //         OTP: otpGenerated,
    //     });
    //     console.log("here72");
    // } catch (err) {
    //     return error(res, 'Unable to sign up, Please try again later', 401);
    // }

    await newUser.save();
    const token = newUser.getJWT();
    return res.status(200).json({
        token,
        userType,
        message: "successful"
    });
});

router.post('/validate', async (req, res, next) => {

    const { email, otp, token } = req.body;
    const user = await User.findOne({
        email,
    });
    if (!user) {
        return error(res, 'User not found', 401);
    }
    // if (user && user.otp !== otp) {
    //     return error(res, 'Invalid OTP', 401);
    // }

    return res.status(200).json({
        email,
        token,
        // otp,
        message: "successful"
    });

});

router.post('/login', async (req, res, next) => {
    const { email, password, userType } = req.body;
    if (!email || !password) return error(res, "email or password is empty", 400);

    if (userType === "normal") {
        const normalUser = await NormalUser.findOne({ email });
        if (normalUser) {
            if (normalUser.password !== password) return error(res, "wrong password", 400);
            const token = normalUser.getJWT();
            return res.status(200).json({ token, message: "successful" });
        }
    }
    else if (userType === "admin") {
        const adminUser = await AdminUser.findOne({ email });
        if (adminUser) {
            if (adminUser.password !== password) return error(res, "wrong password", 400);
            const token = adminUser.getJWT();
            return res.status(200).json({ token, userType, userType, message: "successful" });
        }
    }
    else if (userType === "shopOwner") {
        const storeOwner = await StoreOwner.findOne({ email });
        if (storeOwner) {
            if (storeOwner.password !== password) return error(res, "wrong password", 400);
            const token = storeOwner.getJWT();
            return res.status(200).json({ token, userType, message: "successful" });
        }
    }
    else {
        return error(res, "userType does not exist", 401);
    }
    return error(res, "email doesn't exists", 401);
});

module.exports = router;