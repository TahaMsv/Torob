var express = require('express');
var logger = require('morgan');
var mongoose = require('mongoose');
var createError = require('http-errors');

var app = express();

const dbPath = `mongodb://localhost:27017/torob`;
mongoose.connect(dbPath,  {useNewUrlParser: true, useUnifiedTopology: true});
// require('./models/adminUser');
// require('./models/normalUser');
require('./models/product');
require('./models/report');
require('./models/store');
require('./models/storeOwner');
require('./models/type');
require('./models/user');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', require('./routes/index'));

app.use(function(req, res, next) {
  next(createError(404));
});


module.exports = app;
