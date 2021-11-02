const mongoose = require("mongoose");
const collectionSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	image: {
		type: String,
		required: true,
	},
	items: [
		{
			type: mongoose.Types.ObjectId,
			ref: "book",
			required: true,
		},
	],
	maskColor: {
		type: String,
		required: true,
	},
	contributors: [
		{
			type: mongoose.Types.ObjectId,
			ref: "user",
			required: true,
		},
	],
	proposer: mongoose.Types.ObjectId,
});
const Collection = mongoose.model("collection", collectionSchema);
module.exports = Collection;
