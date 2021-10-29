const mongoose = require("mongoose");
const goodSchema = new mongoose.Schema({
	is: {
		type: mongoose.ObjectId,
		required: true,
	},
	condition: {
		type: String,
		required: true,
	},
	price: {
		type: Number,
		required: true,
	},
	type: {
		type: String,
		required: true,
	},
	lastOwner: {
		type: mongoose.ObjectId,
	},
	latestSellers: {
		type: mongoose.ObjectId,
	},
	latestTraders: {
		type: mongoose.ObjectId,
	},
});

const Good = mongoose.model("good", goodSchema);
module.exports = Good;
