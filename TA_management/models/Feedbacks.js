const mongoose = require("mongoose");

const FeedbackSchema = new mongoose.Schema({
	username: String,
  name: String,
  email: String,
  course: String,
  feedback: String,
});

const Feedback = mongoose.model("Feedback", FeedbackSchema);

module.exports = Feedback;
