const mongoose = require("mongoose");

const NotificationSchema = new mongoose.Schema({
	username: String,
  user: String,
  message: String,
  seen: Boolean,
});

const Notification = mongoose.model("Notification", NotificationSchema);

module.exports = Notification;
