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
	items: {
		type: Array,
		required: true,
	},
	maskColor: {
		type: String,
		required: true,
	},
	contibutors: {
		type: Array,
		required: true,
	},
	proposer: mongoose.ObjectId,
});
const Collection = mongoose.model("collection", collectionSchema);
module.exports = Collection;
