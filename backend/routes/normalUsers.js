var express = require('express');
var router = express.Router();
const NormalUser = mongoose.model('NormalUser');
const Product = mongoose.model('Product');
const error = require("../utilities/errorFunction");
const authorization = require('../middlewares/user-auth');

/* GET users listing. */
router.put('/addfavorite', authorization, function async(req, res, next) {
  const { productId } = req.body;
  if (!productId) return error(res, "productId is empty", 400);
  const normalUser = await(NormalUser.findOne({ emial: req.user.email }));
  if (normalUser.favoriteProducts.includes(productId)) return error(res, "this product is already in favorites list", 400);
  normalUser.favoriteProducts.unshift(productId);
  normalUser.save();
  return res.status(200).json({ token, message: "successful" });
});

router.delete('/removefavorite', authorization, function async(req, res, next) {
  const { productId } = req.body;
  if (!productId) return error(res, "productId is empty", 400);
  const normalUser = await(NormalUser.findOne({ emial: req.user.email }));
  if (!normalUser.favoriteProducts.includes(productId)) return error(res, "this product is not in favorites list", 400);
  var productIndex = normalUser.favoriteProducts.indexOf(productId);
  normalUser.favoriteProducts.splice(productIndex, 1);
  normalUser.save();
  return res.status(200).json({ token, message: "successful" });
});

router.put('/addlatest', authorization, function async(req, res, next) {
  const { productId } = req.body;
  if (!productId) return error(res, "productId is empty", 400);
  const normalUser = await(NormalUser.findOne({ emial: req.user.email }));
  if (normalUser.latestProducts.includes(productId)) {
    var productIndex = normalUser.latestProducts.indexOf(productId);
    normalUser.latestProducts.splice(productIndex, 1);
  }
  normalUser.latestProducts.unshift(productId);

  if (Object.keys(normalUser.latestProducts).length > 20) {
    normalUser.latestProducts = normalUser.latestProducts.slice(0, 20);
  }
  normalUser.save();
  return res.status(200).json({ token, message: "successful" });
});

router.get('/favorites', authorization, function async(req, res, next) {
  const normalUser = await(NormalUser.findOne({ emial: req.user.email }));

  const favoritesList = normalUser.favoriteProducts.map(async productId => {
    const product = await (Product.findOne({ id: productId }));
    if (product) {
      return {
        "id": product.id,
        "name": product.name,
        "img": product.imageUrl
      };
    }
  });
  return res.status(200).json(favoritesList);
});

router.get('/latest', authorization, function async(req, res, next) {
  const normalUser = await(NormalUser.findOne({ emial: req.user.email }));

  const favoritesList = normalUser.latestProducts.map(async productId => {
    const product = await (Product.findOne({ id: productId }));
    if (product) {
      return {
        "id": product.id,
        "name": product.name,
        "img": product.imageUrl
      };
    }
  });
  return res.status(200).json(favoritesList);
});
module.exports = router;
