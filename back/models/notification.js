const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
  {
    notificationText: {
      type: String,
      required: [true, "Please add notification text"],
    },
    read: {
      type: Boolean,
      default: false,
    },
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
      required: [true, "Please add post"],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Please add user"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Notification", notificationSchema);
