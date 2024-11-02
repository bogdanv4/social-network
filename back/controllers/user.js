const User = require("../models/user");
const ErrorResponse = require("../utils/errorResponse");

exports.deleteUser = async (req, res, next) => {
  const user = await User.deleteOne({ _id: req.params.id });
  res.clearCookie("token");
  res.status(200).json({
    success: true,
    message: "User deleted",
  });
};

exports.updateUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.status(200).json({
      success: true,
      message: "User updated",
      user,
    });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({
      success: false,
      message: "User not updated",
    });
  }
};
