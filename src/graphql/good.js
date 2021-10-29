const goodType = `
	type Good {
		id: ID!
		is: ID!
		"商品品质"
		condition: String!
		"消费金额"
		price: Int!
		type: String!
		lastOwner: User
		latestSellers: [User]
		latestTraders: [User]
	}
`;

const goodResolver = {
	Query: {
		good: async (_, { id }, { models }) => {
			return await models.Good.findById(id);
		},
	},
};

module.exports = {
	goodType,
	goodResolver,
};
