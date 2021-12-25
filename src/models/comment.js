const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
	{
		content: {
			type: String,
			required: true,
		},
		commenter: {
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
