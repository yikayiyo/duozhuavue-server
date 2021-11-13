const {
	AuthenticationError,
	ForbiddenError,
} = require("apollo-server-express");

const collectionType = `
  type Collection {
    id: ID!
    name: String!
    description: String!
    image: String!
    items: [Book!]!
    maskColor: String!
    contributors: [User!]!
		contributions: [Contribution!]!
    proposer: User
  }
`;

const collectionResolver = {
	Query: {
		collection: async (_, { id }, { models, user }) => {
			if (!user)
				throw new ForbiddenError(
					"You should signIn before visiting collection info!"
				);
			return await models.Collection.findById(id);
		},
		collections: async (_, __, { models, user }) => {
			if (!user)
				throw new ForbiddenError(
					"You should signIn before visiting collections info!"
				);
			return await models.Collection.find({});
		},
	},
	Collection: {
		proposer: async ({ proposer }, _, { models }) => {
			const user = await models.User.findById(proposer);
			return user;
		},
		items: async ({ items }, _, { models }) => {
			return await models.Book.find({
				_id: {
					$in: items,
				},
			});
		},
		contributors: async ({ contributors }, _, { models }) => {
			return await models.User.find({
				_id: {
					$in: contributors,
				},
			});
		},
		contributions: async ({ contributions }, _, { models }) => {
			return await models.Contribution.find({
				_id: {
					$in: contributions,
				},
			});
		},
	},
};

module.exports = {
	collectionType,
	collectionResolver,
};
