const contributionType = `
  type Contribution {
    contributor: User!
    book: Book!
    reason: String!
    isPopular: Boolean!
    createdAt: DateTime!
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
};

module.exports = {
	contributionType,
	contributionResolver,
};
