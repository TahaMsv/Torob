const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
  id: { type: Number, unique: true },
  name: { type: String },
  type: { type: mongoose.Schema.Types.ObjectId, ref: 'Type' },
  imageUrl: { type: String },
  details: {
    type: Map,
    of: String
  },
  stores: {
    type: [{
      type: Map,
      of: String
    },], default: []
  },
});

module.exports = mongoose.model('Product', productSchema);