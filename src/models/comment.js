const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
	{
		content: {
			type: String,
			required: true,
		},
		rating: {
			type: Number,
			required: true,
			default: 0,
		},
		voteByMe: {
			type: Boolean,
			default: false,
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
