const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {
	AuthenticationError,
	ForbiddenError,
} = require("apollo-server-express");

require("dotenv").config();

const userType = `
	type User {
		id: ID!
		name: String!
    email: String!
    password: String!
    owningBooks: [Book]
    bookShelf: [Book]
    soldBooks: [Book]
    purchasedBooks: [Book]
    #orders: []
    #activities: []
		#addresses: [String!]
    balance: Int
    creditBalance: Float
    income: Int
		avatar: String!
	}
`;

const userResolver = {
	Query: {
		user: async (_, { id }, { models }) => {
			return await models.User.findById(id);
		},
	},
	Mutation: {
		signUp: async (_, { name, email, password }, { models }) => {
			email = email.trim().toLowerCase();
			const hashed = await bcrypt.hash(password, 10);
			try {
				const user = await models.User.create({
					name,
					email,
					password: hashed,
				});
				return jwt.sign({ id: user._id }, process.env.JWT_SECRET);
			} catch (err) {
				console.log(err);
				throw new Error("Error creating account");
			}
		},
		signIn: async (_, { email, password }, { models }) => {
			if (email) email = email.trim().toLowerCase();
			const user = await models.User.findOne({
				email,
			});
			if (!user) {
				throw new AuthenticationError("Couldn't find this user");
			}
			const valid = await bcrypt.compare(password, user.password);
			if (!valid) {
				throw new AuthenticationError("Password didn't match");
			}
			return jwt.sign({ id: user._id }, process.env.JWT_SECRET);
		},
	},
	User: {
		purchasedBooks: async ({ purchasedBooks }, _, { models }) => {
			const res = [];
			if (purchasedBooks.length === 0) return res;
			for (id of purchasedBooks) {
				const book = await models.Book.findById(id);
				res.push(book);
			}
			return res;
		},
		soldBooks: async ({ soldBooks }, _, { models }) => {
			const res = [];
			if (soldBooks.length === 0) return res;
			for (id of soldBooks) {
				const book = await models.Book.findById(id);
				res.push(book);
			}
			return res;
		},
		owningBooks: async ({ owningBooks }, _, { models }) => {
			const res = [];
			if (owningBooks.length === 0) return res;
			for (id of owningBooks) {
				const book = await models.Book.findById(id);
				res.push(book);
			}
			return res;
		},
		bookShelf: async ({ bookShelf }, _, { models }) => {
			const res = [];
			if (bookShelf.length === 0) return res;
			for (id of bookShelf) {
				const book = await models.Book.findById(id);
				res.push(book);
			}
			return res;
		},
	},
};

module.exports = {
	userType,
	userResolver,
};
