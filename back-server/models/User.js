const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  email: String,
  password: String,
  imageUrl: {type: String, default: '/images/user-photo.jpg'},
  favorites: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Location'
  }],
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const User = mongoose.model('User', userSchema);
module.exports = User;
