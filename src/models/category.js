const mongoose = require("mongoose");
const categorySchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	description: {
		type: String,
	},
	image: {
		type: String,
	},
	level: {
		type: Number,
		required: true,
	},
	productType: {
		type: String,
		required: true,
	},
	parentCategory: {
		type: mongoose.Types.ObjectId,
	},
	subCategory: [
		{
			type: mongoose.Types.ObjectId,
		},
	],
	themeColor: {
		type: String,
	},
});
const Category = mongoose.model("categorys", categorySchema);
module.exports = Category;
