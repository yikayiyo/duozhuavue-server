const commentType = `
	type Comment {
		id: ID!
    book: Book!
    user: User!
    createdAt: DateTime!
    updatedAt: DateTime!
    voters: [User!]
	}
`;

const commentResolver = {
	Query: {
		comment: async (_, { id }, { models }) => {
			return await models.Comment.findById(id);
		},
	},
};

module.exports = {
	commentType,
	commentResolver,
};
