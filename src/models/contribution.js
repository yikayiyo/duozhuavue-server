const mongoose = require("mongoose");
const contributionSchema = new mongoose.Schema({
	contributor: {
		type: mongoose.Types.ObjectId,
		ref: "user",
		required: true,
	},
	book: {
		type: mongoose.Types.ObjectId,
		ref: "book",
		required: true,
	},
	reason: {
		type: String,
		required: true,
	},
	oc: {
		type: mongoose.Types.ObjectId,
		ref: "collection",
		required: true,
	},
	// createdAt: {
	// 	type: Date,
	// 	required: true,
	// },
	// updateAt: {
	// 	type: Date,
	// },
	// comments:{},
	// voters: {},
	voteByMe: {
		type: Boolean,
		required: true,
		default: false,
	},
});
const Contribution = mongoose.model("contribution", contributionSchema);
module.exports = Contribution;
