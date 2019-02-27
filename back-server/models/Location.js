const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const locationSchema = new Schema({
  name: String,
  adress: String,
  latitude: String,
  longitude: String,
  description: String,
  images: Array 
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const Location = mongoose.model('Location', locationSchema);
module.exports = Location;


