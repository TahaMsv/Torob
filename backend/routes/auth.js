var router = require('express').Router();
const mongoose = require("mongoose");
const NormalUser = mongoose.model('NormalUser');
const AdminUser = mongoose.model('AdminUser');
const StoreOwner = mongoose.model('StoreOwner');
const error = require("../utilities/errorFunction");
const authorization = require('../middlewares/user-auth');

router.post('/signup', async (req, res, next) => {
    const { email, name, phone, password, userType } = req.body;
    if (!name || !email || !password) {
        return error(res, "Name, email or password is empty");
    }
    let newUser;

    if (userType === "normal") {
        const otherSameUser = await (NormalUser.findOne({ email }));
        if (otherSameUser) return error(res, "Email already exist");
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
        if (otherSameUser) return error(res, "Email already exist");
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
    if (!email || !password) return error(res, "email or password is empty");

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
    if (!user) return error(res, "User not found");
});

router.post('/signout',authorization, async (req, res, next) => {

});

module.exports = router;