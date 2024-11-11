const Post = require("../models/post");
const Comment = require("../models/comment");
const Notification = require("../models/notification");
const ErrorResponse = require("../utils/errorResponse");

//Add Post
exports.addPost = async (req, res, next) => {
  try {
    const post = await Post.create({
      ...req.body,
      likedBy: [], // Initialize likedBy as an empty array
    });
    const populatedPost = await Post.findById(post._id).populate(
      "user",
      "username"
    );
    res.status(201).json({
      success: true,
      post: populatedPost,
    });
  } catch (error) {
    console.log(error);
    next(new ErrorResponse(`Can not add post Error: ${error.message}`, 400));
  }
};

//Get All Posts
exports.getAllPosts = async (req, res, next) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 }).populate("user");
    res.status(201).json({
      success: true,
      posts,
    });
  } catch (error) {
    console.log(error);
    next(new ErrorResponse(`Post are not found`, 404));
  }
};

// Get Single Post
exports.singlePost = async (req, res, next) => {
  try {
    //All good
    const post = await Post.findById(req.params.id);
    res.status(201).json({
      success: true,
      post,
    });
  } catch (error) {
    next(new ErrorResponse(`Post with id: ${req.params.id} is not found`, 404));
  }
};

//Delete Post
exports.deletePost = async (req, res, next) => {
  try {
    const postId = req.params.id;

    // Delete the post
    const post = await Post.findByIdAndDelete(postId);

    if (!post) {
      return res
        .status(404)
        .json({ success: false, message: "Post not found" });
    }

    // Delete all comments associated with the post
    await Comment.deleteMany({ post: postId });

    // Delete all notifications associated with the post
    await Notification.deleteMany({ post: postId });

    res
      .status(200)
      .json({
        success: true,
        message: "Post and associated comments and notifications deleted",
      });
  } catch (error) {
    console.log(error.message);
    next(new ErrorResponse(`Cannot delete post. Error: ${error.message}`, 500));
  }
};

// Update Post (Add likes)
exports.updatePost = async (req, res, next) => {
  try {
    const postId = req.params.id;
    const userId = req.body.userId;
    const action = req.body.action; // Get action ("like" or "unlike") from the request

    const post = await Post.findById(postId);

    if (!post) {
      return res
        .status(404)
        .json({ success: false, message: "Post not found" });
    }

    if (action === "like") {
      // Like the post if the user hasn't already liked it
      if (post.likedBy.includes(userId)) {
        return res
          .status(400)
          .json({ success: false, message: "User already liked this post" });
      }

      post.likedBy.push(userId); // Add user to likedBy array
      post.likes += 1; // Increment likes
    } else if (action === "unlike") {
      // Unlike the post if the user has already liked it
      if (!post.likedBy.includes(userId)) {
        return res
          .status(400)
          .json({ success: false, message: "User hasn't liked this post yet" });
      }

      post.likedBy = post.likedBy.filter((id) => id.toString() !== userId); // Remove user from likedBy array
      post.likes -= 1; // Decrement likes
    } else {
      return res
        .status(400)
        .json({ success: false, message: "Invalid action" });
    }

    await post.save();

    res.status(200).json({ success: true, post });
  } catch (error) {
    console.log(error.message);
    next(new ErrorResponse(`Cannot update post. Error: ${error.message}`, 500));
  }
};
