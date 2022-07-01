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
    console.log("here13");
    let products;
    if (value) {
        products = await (Product.find({ "name": { "$regex": value, "$options": "i" } }));
    } else if (type) {
        products = await (Product.find({ "type": { "$regex": type, "$options": "i" } }));
    }
    console.log("here22");

    let returndList;
    if (products) {
        console.log("here26");
        returndList = products.map(product => {
            console.log("here28");

            let leastPrice = 1.797693134862315E+308;
            product.stores.map(store =>{
                if(store["suggestedPrice"] < leastPrice) leastPrice = store["suggestedPrice"];
            });
            
            let isFavorited = false;
            user.favoriteProducts.map(p => {
                console.log("here32");
                if (p === product.id) {
                    console.log("here34");
                    isFavorited = true;
                }
            });
            console.log("here38");
     
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

    console.log("here49");
    console.log(sortby);
    if (returndList) {
        console.log("here51");
        if (sortby === "newest") {
            console.log("here53");
            returndList = returndList.sort((p1, p2) => p2.id - p1.id);
        } else if (sortby === "cheap") {
            console.log("here56");
            returndList = returndList.sort((p1, p2) => p1.leastPrice - p2.leastPrice);
        } else if (sortby === "expensive") {
            console.log("here59");
            returndList = returndList.sort((p1, p2) => p2.leastPrice - p1.leastPrice);
        }
    }
    console.log("here62");
    return res.status(200).json(returndList);
});

module.exports = router;
