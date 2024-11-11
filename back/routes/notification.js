const express = require("express");
const router = express.Router();
const {
  addNotification,
  getAllNotifications,
  markAllAsRead,
} = require("../controllers/notification");
const { isAuthenticated } = require("../middleware/auth");

router.post("/addNotification", addNotification);
router.get("/getAll", getAllNotifications);
router.put("/markAllAsRead", isAuthenticated, markAllAsRead);

module.exports = router;
