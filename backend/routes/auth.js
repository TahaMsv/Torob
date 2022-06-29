var router = require('express').Router();
const mongoose = require("mongoose");
const NormalUser = mongoose.model('NormalUser');
const AdminUser = mongoose.model('AdminUser');
const StoreOwner = mongoose.model('StoreOwner');
const error = require("../utilities/errorFunction");
const authorization = require('../middlewares/user-auth');
const jwt = require('jsonwebtoken');

router.post('/signup', async (req, res, next) => {
    const { email, name, phone, password, userType } = req.body;
    if (!name || !email || !password) {
        return error(res, "Name, email or password is empty", 400);
    }
    let newUser;

    if (userType === "normal") {
        const otherSameUser = await (NormalUser.findOne({ email }));
        if (otherSameUser) return error(res, "Email already exist", 401);
        const newUserId = await NormalUser.count();
        newUser = new NormalUser({
            id: newUserId + 1,
            name,
            email,
            password,
            phone,
        });
    } else {
        const otherSameUser = await (AdminUser.findOne({ email }));
        if (otherSameUser) return error(res, "Email already exist", 401);
        const newUserId = await AdminUser.count();
        newUser = new AdminUser({
            id: newUserId + 1,
            name,
            email,
            password,
        });
    }
    await newUser.save();
    const token = newUser.getJWT();
    return res.status(200).json({ token, message: "successful" });
});

router.post('/login', async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) return error(res, "email or password is empty", 400);

    const normalUser = await NormalUser.findOne({ email });
    const adminUser = await AdminUser.findOne({ email });
    const storeOwner = await StoreOwner.findOne({ email });

    if (normalUser) {
        normalUser.validatePassword(password);
        const token = normalUser.getJWT();
        return res.status(200).json({ token, message: "successful" });
    }
    if (adminUser) {
        adminUser.validatePassword(password);
        const token = adminUser.getJWT();
        return res.status(200).json({ token, message: "successful" });
    }
    if (storeOwner) {
        storeOwner.validatePassword(password);
        const token = storeOwner.getJWT();
        return res.status(200).json({ token, message: "successful" });
    }
    return error(res, "email doesn't exists", 401);
});

router.post('/signout',authorization, async (req, res, next) => {
    jwt.destroy(req.token);
    return res.status(200).json({ token, message: "successful" });
});

module.exports = router;