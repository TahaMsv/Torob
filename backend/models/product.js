const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    id: { type: Number },
    name: { type: String },
    type: {type: mongoose.Schema.Types.ObjectId, ref: 'Type'},
    details: {},
    stores: { type: [Number], default: [] },
});

module.exports = mongoose.model('Product', productSchema);