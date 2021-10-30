const mongoose = require("mongoose");
const contributionSchema = new mongoose.Schema({
	contributor: {
		type: mongoose.ObjectId,
		required: true,
	},
	book: {
		type: mongoose.ObjectId,
		required: true,
	},
	isPopular: {
		type: Boolean,
		required: true,
	},
	reason: {
		type: String,
		required: true,
	},
	// voters: {
	//   type: Array,
	//   required: true
	// }
});
const Contribution = mongoose.model("contribution", contributionSchema);
module.exports = Contribution;
