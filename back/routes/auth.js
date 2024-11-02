const express = require("express");
const router = express.Router();
const {
  signup,
  login,
  logout,
  singleUser,
  userProfile,
} = require("../controllers/auth");
const { isAuthenticated } = require("../middleware/auth");

router.post("/signup", signup);
router.post("/login", login);
router.get("/logout", logout);
router.get("/getme", isAuthenticated, userProfile);
router.get("/user/:id", singleUser);

module.exports = router;
