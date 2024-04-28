const mongoose = require("mongoose");
require("dotenv").config();
const mongodburi = process.env.MONGODBURI;

const connectDB = async () => {
	try {
		await mongoose
			.connect(mongodburi);
		console.log("Connected to MongoDB");
	} catch (err) {
		console.log(mongodburi)
		console.error("Error connecting to MongoDB", err);
	}
};

module.exports = connectDB;
