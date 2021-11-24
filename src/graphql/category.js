const categoryType = `
	type Category {
		id: ID!
		name: String!
    description: String
    image: String
    level: Int!
    productType: String!
    parentCategory: [Category!]
    subCategory: [Category!]
    themeColor: String
    items: [Book!]
	}
`;

const categoryResolver = {
	Query: {
		category: async (_, { id }, { models }) => {
			return await models.Category.findById(id);
		},
		categories: async (_, __, { models }) => {
			return await models.Category.find({});
		},
		topCategories: async (_, __, { models }) => {
			return await models.Category.find({ level: 1 });
		},
	},
	Category: {
		parentCategory: async ({ parentCategory }, _, { models }) => {
			return await models.Category.find({
				_id: {
					$in: parentCategory,
				},
			});
		},
		subCategory: async ({ subCategory }, _, { models }) => {
			return await models.Category.find({
				_id: {
					$in: subCategory,
				},
			});
		},
		items: async ({ items }, _, { models }) => {
			return await models.Book.find({
				_id: {
					$in: items,
				},
			});
		},
	},
};

module.exports = {
	categoryType,
	categoryResolver,
};
