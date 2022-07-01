const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const Store = mongoose.model('Store');
const StoreOwner = mongoose.model('StoreOwner');
const NormalUser = mongoose.model('NormalUser');
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
                let updatePrice = false;
                sameProduct.stores.map(s => {
                    if (s["shopId"] == shopId) {
                        s["suggestedPrice"] = suggestedPrice;
                        updatePrice = true;
                    }
                })
                if (!updatePrice) {
                    sameProduct.stores.push(
                        {
                            shopId,
                            suggestedPrice
                        }
                    );
                }

                if (!store.products.includes(sameProduct.id)) store.products.push(sameProduct.id);

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

                let updatePrice = false;
                product.stores.map(s => {
                    if (s["shopId"] == shopId) {
                        s["suggestedPrice"] = suggestedPrice;
                        updatePrice = true;
                    }
                })
                if (!updatePrice) {
                    product.stores.push(
                        {
                            shopId,
                            suggestedPrice
                        }
                    );
                }


                if (!store.products.includes(productId)) store.products.push(productId);

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


router.get('/:product_id', authorization, async function (req, res, next) {
    const productId = req.params.product_id;
    const product = await (Product.findOne({ id: productId }));
    if (!product) return error(res, "this product doesn't exists", 400);

    const user = await (NormalUser.findOne({ email: req.user.email }));
    let isFavorited = false;
    user.favoriteProducts.map(pId => {
        if (pId == product.id) {
            isFavorited = true;
        }
    })
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
    return res.status(200).json({
        id: product.id,
        name: product.name,
        img: product.imageUrl,
        productType: product.type,
        details: product.details,
        isFavorited,
        stores: storeReturnedList
    });

});

module.exports = router;