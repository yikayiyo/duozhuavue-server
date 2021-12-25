const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
	{
		content: {
			type: String,
			required: true,
		},
		book: {
			type: mongoose.Types.ObjectId,
			ref: "Book",
			required: true,
		},
		user: {
			type: mongoose.Types.ObjectId,
			ref: "User",
			required: true,
		},
		voters: [
			{
				type: mongoose.Types.ObjectId,
				ref: "User",
			},
		],
	},
	{
		timestamps: true,
	}
);

const Comment = mongoose.model("comment", commentSchema);
module.exports = Comment;
