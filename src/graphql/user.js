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
