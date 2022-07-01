const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
  id: { type: Number, unique: true },
  name: { type: String },
  type: { type: String },
  imageUrl: { type: String },
  dateAdded: { type: Date,  default: Date.now() },
  link: { type: String },
  details: {
    type: Map,
    of: String
  },
  stores: {                          //{ "shopId":  }
    type: {
      type: Map,
      of: String
    }, default: {}
  },
});

module.exports = mongoose.model('Product', productSchema);