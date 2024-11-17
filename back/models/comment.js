const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    commentText: {
      type: String,
      required: [true, "Please add comment text"],
    },
    likes: {
      type: Number,
      default: 0,
    },
    likedBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    date: {
      type: String,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Please add user"],
    },
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
      required: [true, "Please add post"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Comment", commentSchema);
