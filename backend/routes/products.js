var express = require('express');
var router = express.Router();
const Store = mongoose.model('Store');
const StoreOwner = mongoose.model('StoreOwner');
const Product = mongoose.model('Product');
const authorization = require('../middlewares/user-auth');


router.post('/create', authorization, function async(req, res, next) {
    const { name, suggestedPrice, details, img, link, productType } = req.body;
    const owner = await(StoreOwner.findOne({ email: req.user.email }));
    if (owner) {
        const productId = await Product.count() + 1;
        const product = new Product({
            id: productId,
            name,
            type: productType,  // این قسمت باید درست شه.
            imageUrl: img,
            details
        });
        // باید معلوم شه محصول برای کدوم استوره.
        product.save();
        return res.status(200).json({
            id: product.productId,
            message: "successful"
        });
    }
    return error(res, "permission denied", 400);
});

router.post('/addstore', authorization, function async(req, res, next) {
    const { productId, shopId } = req.body;
    const owner = await(StoreOwner.findOne({ email: req.user.email }));
    if (owner) {
        const store = await(Store.findOne({ id: shopId }));
        const product = await(Product.findOne({ id: productId }));

        // اضافه کردن استور به لیست استور ها در محصول
        return res.status(200).json({
            message: "successful"
        });
    }
    return error(res, "permission denied", 400);

});


router.get('/:product_id', authorization, function async(req, res, next) {
    const productId = req.params.product_id;
    const product = await(Product.findOne({ id: productId }));
    if (!product) return error(res, "this product doesn't exists", 400);

    const storesList = await product.stores.map(async storeId => {
        const store = await (Store.findOne({ id: shopId }));
        if (store) {
            return {
                "id": store.id,
                "name": store.name,
                "city": store.city,
                "sellingPrice": "55000000",  // دقیق نمیدونم از کجا میاد
                "link": "facebook.com" // دقیق نمیدونم از کجا میاد
            };
        }
    });

    return res.status(200).json({
        id: product.id,
        name: product.name,
        img: product.imageUrl,
        productType: "laptop|lenovo",  // باید محاسبه بشه
        details: product.details,
        stores:storesList
    });

});
