const mongoose = require("mongoose");

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
		comments: [Comment!]
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
	Mutation: {
		toggleBookshelf: async (_, { bookId, userId }, { models }) => {
			const user = await models.User.findById(userId);
			const hasBook = user.bookShelf.indexOf(bookId);
			// if the book doen't exist in the bookshelf list
			if (hasBook < 0) {
				const user = await models.User.findByIdAndUpdate(
					userId,
					{
						$push: {
							bookShelf: mongoose.Types.ObjectId(bookId),
						},
					},
					// to return the updated doc
					{
						new: true,
					}
				);
				return {
					code: "200",
					success: true,
					message: "book is successfully added to the bookshelf.",
					user,
				};
			} else {
				const user = await models.User.findByIdAndUpdate(
					userId,
					{
						$pull: {
							bookShelf: mongoose.Types.ObjectId(bookId),
						},
					},
					{
						new: true,
					}
				);
				return {
					code: "200",
					success: true,
					message: "book is successfully removed from the bookshelf.",
					user,
				};
			}
		},
		addComment: async (
			_,
			{ bookId, userId, content, rating, created },
			{ models }
		) => {
			const user = await models.User.findById(userId);
			const newComment = {
				rating,
				content,
				commenter: user,
				createdAt: created,
			};
			try {
				const comment = await models.Comment.create(newComment);
				const book = await models.Book.findByIdAndUpdate(
					bookId,
					{
						$push: {
							comments: comment._id,
						},
					},
					{
						new: true,
					}
				);
				return {
					code: "200",
					success: true,
					message: "comment is successfully added.",
					book,
					comment,
				};
			} catch (error) {
				return {
					code: "500",
					success: false,
					message: error,
				};
			}
		},
	},
	Book: {
		comments: async ({ comments }, _, { models }) => {
			return await models.Comment.find({
				_id: {
					$in: comments,
				},
			});
		},
	},
};

module.exports = {
	bookType,
	bookResolver,
};
