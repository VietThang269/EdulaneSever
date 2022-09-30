const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const commentSchema = new Schema(
  {
    comment: { type: String, required: true },
    clsId: { type: String, required: true },
    contentId: { type: String, required: true },
    userId: { type: String, required: true },
    posted_at: { type: String, required: false },
  },
  {
    timestamps: true,
  }
);

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
