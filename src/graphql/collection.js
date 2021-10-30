const collectionType = `
  type Collection {
    id: ID!
    name: String!
    description: String!
    image: String!
    items: [Book!]
    maskColor: String!
    contributors: [User!]
    proposer: User
  }
`;

const collectionResolver = {
	Query: {
		collection: async (_, { id }, { models }) => {
			return await models.Collection.findById(id);
		},
		collections: async (_, __, { models }) => {
			return await models.Collection.find({});
		},
	},
	Collection: {
		proposer: async ({ proposer }, _, { models }) => {
			const user = await models.User.findById(proposer);
			return user;
		},
	},
};

module.exports = {
	collectionType,
	collectionResolver,
};
