const mongoose = require('mongoose');

const reportSchema = mongoose.Schema({
    id: { type: Number },
    userID: { type: Number },
    content: { type: String},
    shopID: {type: Number },
    type: {
        type: String,
        enum : ['ثبت تخلف','قیمت خارج محدوده'],
    },
});

module.exports = mongoose.model('Report', reportSchema);