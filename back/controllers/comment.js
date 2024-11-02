const Comment = require("../models/comment");
const ErrorResponse = require("../utils/errorResponse");

// Add Comment
exports.addComment = async (req, res, next) => {
  try {
    const comment = await Comment.create(req.body);
    res.status(201).json({
      success: true,
      comment,
    });
  } catch (error) {
    console.log(error);
    next(new ErrorResponse(`Can not add comment Error: ${error.message}`, 400));
  }
};

//Get All comments
exports.getAllComments = async (req, res, next) => {
  try {
    const { postId } = req.params;
    const comments = await Comment.find({ post: postId })
      .sort({ createdAt: -1 })
      .populate("user");
    res.status(201).json({
      success: true,
      comments,
    });
  } catch (error) {
    console.log(error);
    next(new ErrorResponse(`Comments are not found`, 404));
  }
};

//Delete comment
exports.deleteComment = async (req, res, next) => {
  const comment = await Comment.deleteOne({ _id: req.params.id });
  res.status(200).json({
    success: true,
    message: "Comment deleted",
  });
};

// Update Comment (Add likes)
exports.updateComment = async (req, res, next) => {
  try {
    const commentId = req.params.id;
    const userId = req.body.userId;
    const action = req.body.action; // Get action ("like" or "unlike") from the request

    const comment = await Comment.findById(commentId);

    if (!comment) {
      return res
        .status(404)
        .json({ success: false, message: "Comment not found" });
    }

    if (action === "like") {
      // Like the comment if the user hasn't already liked it
      if (comment.likedBy.includes(userId)) {
        return res
          .status(400)
          .json({ success: false, message: "User already liked this comment" });
      }

      comment.likedBy.push(userId); // Add user to likedBy array
      comment.likes += 1; // Increment likes
    } else if (action === "unlike") {
      // Unlike the comment if the user has already liked it
      if (!comment.likedBy.includes(userId)) {
        return res
          .status(400)
          .json({
            success: false,
            message: "User hasn't liked this comment yet",
          });
      }

      comment.likedBy = comment.likedBy.filter(
        (id) => id.toString() !== userId
      ); // Remove user from likedBy array
      comment.likes -= 1; // Decrement likes
    } else {
      return res
        .status(400)
        .json({ success: false, message: "Invalid action" });
    }

    await comment.save();

    res.status(200).json({ success: true, comment });
  } catch (error) {
    console.log(error.message);
    next(
      new ErrorResponse(`Cannot update comment. Error: ${error.message}`, 500)
    );
  }
};
