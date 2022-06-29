var express = require('express');
var router = express.Router();

router.use('/auth', require('./auth'));
router.use('/products', require('./product'));
router.use('/normalUsers', require('./normaluser'));
router.use('/allUsers', require('./user'));
router.use('/shopowners', require('./shopowner'));
router.use('/reports', require('./report'));


module.exports = router;
