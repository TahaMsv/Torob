const mongoose = require('mongoose');

const typeSchema = mongoose.Schema({
    id: { type: Number , unique: true},
    type: { type: String },
    subType: { type:[this] },
});

module.exports = mongoose.model('Type', typeSchema);