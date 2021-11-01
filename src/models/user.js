const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		index: { unique: true },
	},
	password: {
		type: String,
		required: true,
	},
	owningBooks: {
		type: Array,
	},
	bookShelf: {
		type: Array,
	},
	soldBooks: {
		type: Array,
	},
	purchasedBooks: {
		type: Array,
	},
	orders: {
		type: Array,
	},
	activities: {
		type: Array,
	},
	balance: {
		type: Number,
		default: 0,
	},
	creditBalance: {
		type: Number,
		default: 0,
	},
	income: {
		type: Number,
		default: 0,
	},
	avatar: {
		type: String,
		default: "",
	},
});

const User = mongoose.model("user", userSchema);
module.exports = User;
