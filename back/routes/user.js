const express = require("express");
const router = express.Router();
const { deleteUser, updateUser } = require("../controllers/user");

router.delete("/deleteUser/:id", deleteUser);
router.put("/updateUser/:id", updateUser);

module.exports = router;
