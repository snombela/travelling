const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const commentSchema = new Schema({
    title: String,
    content: String,
    authorId: {type: Schema.Types.ObjectId, ref: "User"},
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;
