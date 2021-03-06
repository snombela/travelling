const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const locationSchema = new Schema({
  internalId: String,
  name: String,
  movieshow: String,
  address: String,
  latitude: String,
  longitude: String,
  description: String,
  images: [ {type: String} ],
  comments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment'
  }],
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const Location = mongoose.model('Location', locationSchema);
module.exports = Location;


