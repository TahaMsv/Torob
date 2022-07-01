const mongoose = require('mongoose');
var express = require('express');
var router = express.Router();
const Report = mongoose.model('Report');
const Store = mongoose.model('Store');
const StoreOwner = mongoose.model('StoreOwner');
const User = mongoose.model('User');
const authorization = require('../middlewares/user-auth');
const error = require("../utilities/errorFunction");

router.post('/create', async function (req, res, next) {
  const { userId, shopId, content, type } = req.body;
  const store = await(Store.findOne({ id: shopId }));
  if (!store) return error(res, "requested shop not found", 400);
  const reportId = await Report.count() + 1;
  const report = new Report({
    id: reportId,
    userID: userId,
    content: content,
    shopID: shopId,
    type: type,
  });

  store.reports.push(reportId);
  store.save();
  report.save();
  return res.status(200).json({
    id: report.reportId,
    message: "successful"
  });
});


router.get('/:shop_id', authorization, async function (req, res, next) {
  const shopId = req.params.shop_id;
  const store = await(Store.findOne({ id: shopId }));
  if (!store) return error(res, "requested shop not found", 400);

  const storeOwner = await(StoreOwner.findOne({ email: req.user.email }));
  if (!storeOwner) return error(res, "permission denied", 401);

  var OwnerOfThisShop = false;
  storeOwner.stores.map(storeId => {
    if (storeId == shopId) {
      OwnerOfThisShop = true;
    }
  });
  if (!OwnerOfThisShop) return error(res, "permission denied", 401);

  const reports = await(Report.find({ shopID: shopId }).sort({ id: 'descending' }));

  const promises = reports.map(async report => {
    const user = await (User.findOne({ id: report.userID }));
    console.log
    if (user) {
      return {
        "userName": user.name,
        "reportType": report.type,
        "content": report.content
      };
    }
  });

  const reportsList = await Promise.all(promises)
  return res.status(200).json(reportsList);

});


module.exports = router;