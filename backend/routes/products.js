const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const Store = mongoose.model('Store');
const StoreOwner = mongoose.model('StoreOwner');
const Product = mongoose.model('Product');
const Type = mongoose.model('Type');
const authorization = require('../middlewares/user-auth');
const error = require("../utilities/errorFunction");

router.post('/create', authorization, async function (req, res, next) {
    const { name, shopId, suggestedPrice, details, img, link, productType } = req.body;
    const owner = await (StoreOwner.findOne({ email: req.user.email }));
    if (owner) {
        if (owner.stores.includes(shopId)) {
            const store = await (Store.findOne({ id: shopId }));
            const sameProduct = await (Product.findOne({ name }));
            if (sameProduct) {
                sameProduct.stores.push(
                    {
                        shopId,
                        suggestedPrice
                    }
                );
                store.products.push(sameProduct.id);

                sameProduct.save();
                store.save();
                return res.status(200).json({
                    id: sameProduct.id,
                    message: "successful"
                });
            }
            else {
                const productId = await Product.count() + 1;
                const product = new Product({
                    id: productId,
                    name,
                    type: productType,
                    imageUrl: img,
                    details,
                    link
                });
                product.stores.push(
                    {
                        shopId,
                        suggestedPrice
                    }
                );
                store.products.push(productId);

                product.save();
                store.save();
                return res.status(200).json({
                    id: product.productId,
                    message: "successful"
                });
            }
        }
    }
    return error(res, "permission denied", 400);
});

router.post('/addstore', authorization, async function (req, res, next) {
    console.log("salam")
    const { productId, shopId, suggestedPrice } = req.body;
    const owner = await (StoreOwner.findOne({ email: req.user.email }));
    if (owner) {
        const store = await (Store.findOne({ id: shopId }));
        const product = await (Product.findOne({ id: productId }));

        if (Object.keys(product.stores).length == 0) { product.dateAdded = Date.now(); }
        if (!store.products.includes(product.id)) {
            store.products.push(product.id);
            product.stores.push({
                shopId,
                suggestedPrice
            });
        } else {
            return error(res, "product already exist", 400);
        }
        product.save();
        store.save();
        return res.status(200).json({
            message: "successful"
        });
    }
    return error(res, "permission denied", 400);

});


router.get('/:product_id', async function (req, res, next) {
    const productId = req.params.product_id;
    const product = await (Product.findOne({ id: productId }));
    if (!product) return error(res, "this product doesn't exists", 400);

    const storeIDs = product.stores.map(sotre => sotre["shopId"]);
    const stores = await (Store.find({
        id: { $in: storeIDs }
    }));

    const storeReturnedList = stores.map(store => {
        return {
            "id": store.id,
            "name": store.name,
            "city": store.city,
            "sellingPrice": product.stores.filter(function (s) {
                if (s["shopId"] != store.id) {
                    return false; // skip
                }
                return true;
            }).map(function (s) { return s["suggestedPrice"]; })[0],
        };
    });

    console.log("here109");
    return res.status(200).json({
        id: product.id,
        name: product.name,
        img: product.imageUrl,
        productType: product.type,
        details: product.details,
        stores: storeReturnedList
    });

});

module.exports = router;