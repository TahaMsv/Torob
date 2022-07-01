const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const Store = mongoose.model('Store');
const StoreOwner = mongoose.model('StoreOwner');
const Product = mongoose.model('Product');
const Type = mongoose.model('Type');
const authorization = require('../middlewares/user-auth');


router.post('/create', authorization, async function (req, res, next) {
    const { name, shopId, suggestedPrice, details, img, link, productType } = req.body;
    const owner = await (StoreOwner.findOne({ email: req.user.email }));
    if (owner) {
        const productId = await Product.count() + 1;
        const product = new Product({
            id: productId,
            name,
            type: productType,
            imageUrl: img,
            details,
            link
        });
        product.stores[shopId] = suggestedPrice;

        const store = await (Store.findOne({ id: shopId }));
        store.products.push(productId);

        product.save();
        store.save();
        return res.status(200).json({
            id: product.productId,
            message: "successful"
        });
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
        product.stores.push({
            shopId: suggestedPrice
        });

        product.stores[shopId] = suggestedPrice;
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

    const storesList = await product.stores.map(async storeId => {
        const store = await (Store.findOne({ id: shopId }));
        if (store) {
            return {
                "id": store.id,
                "name": store.name,
                "city": store.city,
                "sellingPrice": product.stores[store.id],
            };
        }
    });

    return res.status(200).json({
        id: product.id,
        name: product.name,
        img: product.imageUrl,
        productType: product.type,
        details: product.details,
        stores: storesList
    });

});

module.exports = router;