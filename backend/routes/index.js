var express = require('express');
var router = express.Router();

router.use('/auth', require('./auth'));
router.use('/product', require('./products'));
router.use('/normaluser', require('./normalUsers'));
router.use('/user', require('./allUsers'));
router.use('/shopowner', require('./shopOwners'));
router.use('/report', require('./reports'));


module.exports = router;
