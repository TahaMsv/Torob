var express = require('express');
var router = express.Router();

/* GET users listing. */
router.put('/addfavorite', function(req, res, next) {
  const { productId } = req.body;
  res.send('respond with a resource');
});

router.delete('/removefavorite', function(req, res, next) {
  const { productId } = req.body;
  res.send('respond with a resource');
});

router.put('/addlatest', function(req, res, next) {
  const { productId } = req.body;
  res.send('respond with a resource');
});

router.get('/favorites', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/latest', function(req, res, next) {
  res.send('respond with a resource');
});
module.exports = router;
