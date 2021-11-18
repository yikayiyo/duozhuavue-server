const bookType = `
	type Book {
		id: ID!
		title: String!
		rawAuthor: String!
		"出版社"
		publisher: String!
    "出版时间"
		publishDate: String!
		"装帧"
		binding: String!
		doubanRating: Float!
		authorIntro: String
		isbn13: String!
		originalPrice: Int!
		summary: String
		catalog: String
		image: String!
	}
`;

const bookResolver = {
	Query: {
		book: async (_, { id }, { models }) => {
			return await models.Book.findById(id);
		},
		books: async (_, __, { models }) => {
			return await models.Book.find({});
		},
	},
};

module.exports = {
	bookType,
	bookResolver,
};
