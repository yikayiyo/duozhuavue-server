const mongoose = require("mongoose");
const bookSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
	},
	rawAuthor: {
		type: String,
		required: true,
	},
	publisher: {
		type: String,
		required: true,
	},
	publishDate: {
		type: String,
		required: true,
	},
	binding: {
		type: String,
		required: true,
	},
	doubanRating: {
		type: Number,
	},
	authorIntro: {
		type: String,
	},
	isbn13: {
		type: String,
		required: true,
	},
	originalPrice: {
		type: Number,
		required: true,
	},
	price: {
		type: Number,
		required: true
	},
	summary: {
		type: String,
	},
	subtitle: String,
	catalog: String,
	image: "",
	comments: [
		{
			type: mongoose.Types.ObjectId,
			ref: "Comment",
		},
	],
});
// 第一个参数是book时，mongoose会自动关联数据库中名为‘books’（小写、复数形式）的collection
const Book = mongoose.model("book", bookSchema);
module.exports = Book;
