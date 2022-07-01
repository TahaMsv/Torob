const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const Store = mongoose.model('Store');
const StoreOwner = mongoose.model('StoreOwner');
const authorization = require('../middlewares/user-auth');
const error = require("../utilities/errorFunction");

router.post('/addstore', authorization, async function (req, res, next) {
    const { name, city, ownerId } = req.body;
    const owner = await (StoreOwner.findOne({ id: ownerId }));
    const storId = await Store.count() + 1;

    if (owner) {
        const store = new Store({
            id: storId,
            name,
            city
        });

        if (!owner.stores.includes(store.id)) owner.stores.push(store.id);
        owner.save();
        store.save();
        return res.status(200).json({
            id: store.id,
            message: "successful"
        });
    }
    return error(res, "permission denied", 400);
});


router.get('/stores', async function (req, res, next) {
    const stores = await (Store.find({}).sort({ id: "descending" }));
    console.log(stores);
    const responseList = stores.map(store => {
        return {
            "id": store.id,
            "name": store.name,
            "city": store.city
        };
    });
    return res.status(200).json(responseList);
});


module.exports = router;