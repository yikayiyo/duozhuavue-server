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

	type CategoryFeed {
		categories: [Category]!
		cursor: String!
		hasNextPage: Boolean!
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
		categoryFeed: async (_, { cursor }, { models }) => {
			// 数据太少了 -0-
			const limit = 1;
			let hasNextPage = false;

			let cursorQuery = {
				//level为1的分类下没有书籍
				level: 2,
				// 只返回items不为空的分类
				"items.0": {
					$exists: true,
				},
			};
			if (cursor) {
				cursorQuery = {
					_id: {
						$gt: cursor,
					},
					level: 2,
				};
			}
			let categories = await models.Category.find(cursorQuery).limit(limit + 1);
			// console.log(categories);
			if (categories.length > limit) {
				hasNextPage = true;
				categories = categories.slice(0, -1);
			}
			const newCursor = categories[categories.length - 1]._id;
			return {
				categories,
				cursor: newCursor,
				hasNextPage,
			};
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
