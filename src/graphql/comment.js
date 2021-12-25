const commentType = `
	type Comment {
		id: ID!
		content: String!
    commenter: User!
    voters: [User!]
		createdAt: DateTime!
    updatedAt: DateTime!
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
