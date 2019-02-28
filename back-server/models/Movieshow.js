const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const movieshowSchema = new Schema({
  title: String,
  internalLocationIds: String,
  location: String,
  locations: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Location'
  }],
  backgroundUrl: String,
  posterUrl: String,
}, {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  });

const Movieshow = mongoose.model('Movieshow', movieshowSchema);
module.exports = Movieshow;