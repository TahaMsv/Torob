var express = require('express');
var router = express.Router();

router.use('/auth', require('./auth'));
router.use('/products', require('./product'));
router.use('/users', require('./user'));
router.use('/normal_users', require('./normalUsers'));
router.use('/admin_users', require('./admin_user'));
router.use('/shop_owners', require('./shop_owner'));
router.use('/reports', require('./reports'));


module.exports = router;
