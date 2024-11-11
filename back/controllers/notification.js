const Notification = require("../models/notification");
const ErrorResponse = require("../utils/errorResponse");

// Add Notification
exports.addNotification = async (req, res, next) => {
  try {
    const notification = await Notification.create(req.body);

    const populatedNotification = await Notification.findById(
      notification._id
    ).populate({
      path: "post",
      populate: { path: "user", select: "username" },
    });

    res.status(201).json({
      success: true,
      notification: populatedNotification,
    });
  } catch (error) {
    console.log(error);
    next(
      new ErrorResponse(`Can not add notification Error: ${error.message}`, 400)
    );
  }
};

//Get All Notifications
exports.getAllNotifications = async (req, res, next) => {
  try {
    const notifications = await Notification.find()
      .sort({ createdAt: -1 })
      .populate({
        path: "post",
        populate: { path: "user", select: "username" },
      });
    res.status(201).json({
      success: true,
      notifications,
    });
  } catch (error) {
    console.log(error);
    next(new ErrorResponse(`Notifications are not found`, 404));
  }
};

exports.markAllAsRead = async (req, res, next) => {
  try {
    const userId = req.user.id;
    // Update all notifications where 'read' is false
    const updatedNotifications = await Notification.updateMany(
      { user: userId, read: false },
      { $set: { read: true } }
    );

    res.status(200).json({
      success: true,
      message: `${updatedNotifications.nModified} notifications field read are changed to true`,
    });
  } catch (error) {
    console.log(error);
    next(
      new ErrorResponse(
        `Failed to mark notifications as read: ${error.message}`,
        500
      )
    );
  }
};
