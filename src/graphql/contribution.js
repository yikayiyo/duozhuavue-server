const contributionType = `
  type Contribution {
		id: ID!
    contributor: User!
    book: Book!
    reason: String!
    oc: Collection!
    voteByMe: Boolean!
    #createdAt: DateTime!
    #updatedAt: DateTime!
    #comments: [Comment!]
    #voters: [User!]
  }
`;

const contributionResolver = {
	Query: {
		contribution: async (_, { id }, { models }) => {
			return await models.Contribution.findById(id);
		},
	},
	Contribution: {
		book: async ({ book }, _, { models }) => {
			return await models.Book.findById(book);
		},
		contributor: async ({ contributor }, _, { models }) => {
			return await models.User.findById(contributor);
		},
	},
};

module.exports = {
	contributionType,
	contributionResolver,
};
