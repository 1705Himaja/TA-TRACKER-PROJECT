const mongoose = require("mongoose");

const ReqCourseSchema = new mongoose.Schema({
	courseName: {
		type: String,
		required: true
	},
	courseNumber: {
		type: String,
		required: true
	},
	cap: {
		type: Number,
		required: true,
		min: 1,
		max: 500
	},
	cot: {
		type: String,
		enum: ['Core', 'Elective', 'Mandatory'],
		required: true
	},
	len: {
		type: Number,
		required: true,
		min: 1,
		max: 100
	}
});

const ReqCourse = mongoose.model("ReqCourse", ReqCourseSchema);

module.exports = ReqCourse;
