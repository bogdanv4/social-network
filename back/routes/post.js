const express = require("express");
const router = express.Router();
const {
  addPost,
  getAllPosts,
  deletePost,
  singlePost,
  updatePost,
} = require("../controllers/post");

router.post("/addPost", addPost);
router.get("/getAll", getAllPosts);
router.get("/getPost/:id", singlePost);
router.delete("/deletePost/:id", deletePost);
router.put("/updatePost/:id", updatePost);

module.exports = router;
