const goodType = `
	type Good {
		id: ID!
		is: ID!
		type: String!
		"商品品质"
		condition: String!
		"消费金额"
		price: Int!
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
