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
	Comment: {
		commenter: async ({ commenter }, _, { models }) => {
			return await models.User.findById(commenter);
		},
		voters: async ({ voters }, _, { models }) => {
			return await models.User.find({
				_id: {
					$in: voters,
				},
			});
		},
	},
};

module.exports = {
	commentType,
	commentResolver,
};
