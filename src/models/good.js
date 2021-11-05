const mongoose = require("mongoose");
const goodSchema = new mongoose.Schema({
	is: {
		type: mongoose.Types.ObjectId,
		required: true,
		refPath: "type",
	},
	type: {
		type: String,
		required: true,
		enum: ["book", "clothing"],
	},
	condition: {
		type: String,
		required: true,
	},
	price: {
		type: Number,
		required: true,
	},
	lastOwner: {
		type: mongoose.Types.ObjectId,
		ref: "user",
	},
	latestSellers: [
		{
			type: mongoose.Types.ObjectId,
			ref: "user",
		},
	],
	latestTraders: [
		{
			type: mongoose.Types.ObjectId,
			ref: "user",
		},
	],
});

const Good = mongoose.model("good", goodSchema);
module.exports = Good;
