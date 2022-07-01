const mongoose = require('mongoose');
var express = require('express');
var router = express.Router();
const error = require("../utilities/errorFunction");
const authorization = require('../middlewares/user-auth');

const Product = mongoose.model('Product');
const NormalUser = mongoose.model('NormalUser');

router.get('/', authorization, async function (req, res, next) {
    const { value, sortby, type } = req.query;
    const user = await (NormalUser.findOne({ email: req.user.email }));
    let products;
    if (value) {
        products = await (Product.find({ "name": { "$regex": value, "$options": "i" } }));
    } else if (type) {
        products = await (Product.find({ "type": { "$regex": type, "$options": "i" } }));
    }

    let returndList;
    if (products) {
        returndList = products.map(product => {

            let leastPrice = 1.797693134862315E+308;
            product.stores.map(store =>{
                if(store["suggestedPrice"] < leastPrice) leastPrice = store["suggestedPrice"];
            });
            
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

    console.log(sortby);
    if (returndList) {
        if (sortby === "newest") {
            returndList = returndList.sort((p1, p2) => p2.id - p1.id);
        } else if (sortby === "cheap") {
            returndList = returndList.sort((p1, p2) => p1.leastPrice - p2.leastPrice);
        } else if (sortby === "expensive") {
            returndList = returndList.sort((p1, p2) => p2.leastPrice - p1.leastPrice);
        }
    }
    return res.status(200).json(returndList);
});

module.exports = router;
