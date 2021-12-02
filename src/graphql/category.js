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
    items(first: Int, after: String): CategoryItemFeed
	}

	type CategoryFeed {
		categories: [Category]!
		cursor: String!
		hasNextPage: Boolean!
	}

	type CategoryItemFeed {
		books: [Book]!
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
		categoryFeed: async (_, { first = 2, after = "" }, { models }) => {
			// 数据太少了 -0-
			let hasNextPage = false;
			let cursorQuery = {
				//level为1的分类下没有书籍
				level: 2,
				// 只返回items不为空的分类
				"items.0": {
					$exists: true,
				},
			};
			if (after) {
				cursorQuery = {
					_id: {
						$gt: after,
					},
					level: 2,
				};
			}
			let categories = await models.Category.find(cursorQuery).limit(first + 1);
			// console.log(categories);
			if (categories.length > first) {
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
		items: async ({ items }, { first = 2, after = "" }, { models }) => {
			let hasNextPage = false;
			let startIdx = 0;
			console.log("after: ", after);
			if (after) {
				startIdx = items.findIndex((book) => book._id.toString() === after) + 1;
			}
			// if (startIdx >= items.length) {
			// 	return {
			// 		books: [],
			// 		cursor: "",
			// 		hasNextPage: false,
			// 	};
			// }
			let target = items.slice(startIdx, startIdx + first + 1);
			if (target.length > first) {
				hasNextPage = true;
				target = target.slice(0, -1);
			}
			console.log(target);
			const newCursor = target[target.length - 1]._id;
			const books = await models.Book.find({
				_id: {
					$in: target,
				},
			});
			return {
				books,
				cursor: newCursor,
				hasNextPage,
			};
		},
	},
};

module.exports = {
	categoryType,
	categoryResolver,
};
