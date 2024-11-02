const express = require("express");
const router = express.Router();
const {
  addComment,
  getAllComments,
  deleteComment,
  updateComment,
} = require("../controllers/comment");

router.post("/addComment", addComment);
router.get("/getAll/:postId", getAllComments);
router.delete("/deleteComment/:id", deleteComment);
router.put("/updateComment/:id", updateComment);

module.exports = router;
