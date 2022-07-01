const mongoose = require('mongoose');
var express = require('express');
var router = express.Router();
const error = require("../utilities/errorFunction");
const authorization = require('../middlewares/user-auth');

const Product = mongoose.model('Product');
const NormalUser = mongoose.model('NormalUser');

router.get('/', authorization, async function (req, res, next) {
    const { value, sortBy, type } = req.query;
    const user = await (NormalUser.findOne({ email: req.user.email }));

    let products;
    if (value) {
        const products = await (Product.findOne({ "name": { "$regex": value, "$options": "i" } }).sort({ id: 'descending' }));
    } else if (type) {
        const products = await (Product.findOne({ "type": { "$regex": type, "$options": "i" } }).sort({ id: 'descending' }));
    }

    if (products) {
        let returndList = products.map(product => {
            let leastPrice = Math.min(...product.stores.values());
            let isFavorited = false;
            user.favoriteProducts.map(p => {
                if (p === product.id) {
                    isFavorited = true;
                }
            });
            return {
                id: product.id,
                name: product.name,
                img: product.imageUrl,
                leastPrice,
                dateAdded: product.dateAdded,
                isFavorited
            }
        });
    }
    if (returndList) {
        if (type === "new") {
            returndList = returndList.sort((p1, p2) => p1.dateAdded - p2.dateAdded);
        } else if (type === "expensive") {
            returndList = returndList.sort((p1, p2) => p1.leastPrice - p2.leastPrice);
        } else if (type === "cheap") {
            returndList = returndList.sort((p1, p2) => p2.leastPrice - p1.leastPrice);
        }
    }
    return res.status(200).json(returndList);
});

module.exports = router;
