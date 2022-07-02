const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const NormalUser = mongoose.model('NormalUser');
const Product = mongoose.model('Product');
const error = require("../utilities/errorFunction");
const authorization = require('../middlewares/user-auth');



router.put('/addfavorite', authorization, async function (req, res, next) {
  const { productId } = req.body;
  if (!productId) return error(res, "productId is empty", 400);
  const normalUser = await (NormalUser.findOne({ email: req.user.email }));
  if (normalUser.favoriteProducts.includes(productId)) return error(res, "this product is already in favorites list", 400);
  normalUser.favoriteProducts.unshift(productId);
  normalUser.save();
  return res.status(200).json({ message: "successful" });
});

router.delete('/removefavorite', authorization, async function (req, res, next) {
  const { productId } = req.body;
  if (!productId) return error(res, "productId is empty", 400);
  const normalUser = await (NormalUser.findOne({ email: req.user.email }));
  if (!normalUser.favoriteProducts.includes(productId)) return error(res, "this product is not in favorites list", 400);
  var productIndex = normalUser.favoriteProducts.indexOf(productId);
  normalUser.favoriteProducts.splice(productIndex, 1);
  normalUser.save();
  return res.status(200).json({ message: "successful" });
});

router.put('/addlatest', authorization, async function (req, res, next) {
  const { productId } = req.body;
  if (!productId) return error(res, "productId is empty", 400);
  const normalUser = await (NormalUser.findOne({ email: req.user.email }));
  if (normalUser.latestProducts.includes(productId)) {
    var productIndex = normalUser.latestProducts.indexOf(productId);
    normalUser.latestProducts.splice(productIndex, 1);
  }
  normalUser.latestProducts.unshift(productId);

  if (Object.keys(normalUser.latestProducts).length > 20) {
    normalUser.latestProducts = normalUser.latestProducts.slice(0, 20);
  }
  normalUser.save();
  return res.status(200).json({ message: "successful" });
});

router.get('/favorites', authorization, async function (req, res, next) {
  const normalUser = await (NormalUser.findOne({ email: req.user.email }));

  const promises = normalUser.favoriteProducts.map(async productId => {
    const product = await (Product.findOne({ id: productId }));
    let leastPrice = 1.797693134862315E+308;

    if (product) {
      product.stores.map(store => {
        if (store["suggestedPrice"] < leastPrice) leastPrice = store["suggestedPrice"];
      });
      return {
        "id": product.id,
        "name": product.name,
        "img": product.imageUrl,
        leastPrice,
        "dateAdded": product.dateAdded,
        "isFavorited": true
      };
    }
  });
  const favoritesList = await Promise.all(promises)
  return res.status(200).json(favoritesList);
});

router.get('/latest', authorization, async function (req, res, next) {
  const normalUser = await (NormalUser.findOne({ email: req.user.email }));

  const promises = normalUser.latestProducts.map(async productId => {
    const product = await (Product.findOne({ id: productId }));
    if (product) {
      let leastPrice = 1.797693134862315E+308;
      product.stores.map(store => {
        if (store["suggestedPrice"] < leastPrice) leastPrice = store["suggestedPrice"];
      });
      let isFavorited = false;
      normalUser.favoriteProducts.map(p => {
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
      };
    }
  });
  const latestList = await Promise.all(promises)
  return res.status(200).json(latestList);
});
module.exports = router;
