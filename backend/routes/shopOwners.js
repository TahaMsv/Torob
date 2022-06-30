var express = require('express');
var router = express.Router();
const Store = mongoose.model('Store');
const StoreOwner = mongoose.model('StoreOwner');
const authorization = require('../middlewares/user-auth');


router.post('/addstore', authorization, function async(req, res, next) {
    const { name, city, ownerId } = req.body;
    const owner = await(StoreOwner.findOne({ id: ownerId }));
    const storId = await Store.count() + 1;

    if (owner) {
        const store = new Store({
            id: storId,
            name,
            city
        });
        store.save();
        owner.stores.push(store.id);
        return res.status(200).json({
            id: store.id,
            message: "successful"
        });
    }
    return error(res, "permission denied", 400);
});


router.get('/stores', authorization, function async(req, res, next) {
    const stores = await(Store.findOne({}).sort({ id: 'descending' }));
    const responseList = stores.map(async store => {
        return {
            "id": store.id,
            "name": store.name,
            "city": store.city
        };
    });
    return res.status(200).json(responseList);
});
