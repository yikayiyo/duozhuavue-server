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
		price: Int!
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
		isBookInBookshelf: async (_, { bookId, userId }, { models }) => {
			if(userId === "") return false;
			const user = await models.User.findById(userId);
			return user.bookShelf.indexOf(bookId) >= 0;
		}
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
		deleteComment: async (_, { bookId, commentId }, { models }) => {
			try {
				const comment = await models.Comment.findById(commentId);
				const book = await models.Book.findByIdAndUpdate(
					bookId,
					{
						$pull: {
							comments: commentId,
						},
					},
					{
						new: true,
					}
				);
				await comment.remove();
				return {
					code: "200",
					success: true,
					message: "comment is successfully deleted.",
					book,
				};
			} catch (err) {
				return {
					code: "500",
					success: false,
					message: err,
				};
			}
		},
		updateComment: async (
			_,
			{ commentId, rating, content, updatedAt },
			{ models }
		) => {
			// 更新comment
			const filter = { _id: commentId };
			const update = {
				rating,
				content,
				updatedAt,
			};
			// 服务器端校验表单内容是否变化，如果没有变化，则返回信息提示更新表单内容
			const originalComment = await models.Comment.findById(commentId);
			if(originalComment.rating === rating && originalComment.content === content) {
				return {
					code: "200",
					success: false,
					message: "you should change rating or comment.",
				}
			}

			// 表单变化，尝试更新
			try {
				const comment = await models.Comment.findOneAndUpdate(filter, update, {
					new: true,
				});
				return {
					code: "200",
					success: true,
					message: "comment is successfully updated.",
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
