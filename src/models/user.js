const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
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
	},
	creditBalance: {
		type: Number,
	},
	income: Number,
	avatar: String,
});

const User = mongoose.model("user", userSchema);
module.exports = User;
