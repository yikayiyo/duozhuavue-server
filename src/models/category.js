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
		ref: "category",
	},
	subCategory: [
		{
			type: mongoose.Types.ObjectId,
			ref: "category",
		},
	],
	themeColor: {
		type: String,
	},
	items: [
		{
			type: mongoose.Types.ObjectId,
			ref: "book",
		},
	],
});
const Category = mongoose.model("categorys", categorySchema);
module.exports = Category;
