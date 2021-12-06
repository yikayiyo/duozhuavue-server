const categoryType = `
	type PageInfo {
		hasPreviousPage: Boolean!
		hasNextPage: Boolean!
		startCursor: String!
		endCursor: String!
	}

  type CategoryConnection {
		edges: [CategoryEdge!]!
		pageInfo: PageInfo!
	}

	type CategoryEdge {
		node: Category!
		cursor: String!
	}

	type CategoryItemConnection {
		edges: [CategoryItemEdge!]!
		pageInfo: PageInfo!
	}

	type CategoryItemEdge {
		node: Book!
		cursor: String!
	}

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
    items(first: Int, after: String): CategoryItemConnection
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
			let newCursor = after;
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
					...cursorQuery,
					_id: {
						$gt: after,
					},
				};
			}
			let categories = await models.Category.find(cursorQuery).limit(first + 1);
			// console.log(categories);
			if (categories.length > first) {
				hasNextPage = true;
				categories = categories.slice(0, -1);
				newCursor = categories[categories.length - 1]._id;
			} else if (categories.length > 0) {
				newCursor = categories[categories.length - 1]._id;
			}
			const edges = categories.map((category) => ({
				node: category,
				cursor: category._id,
			}));
			return {
				edges,
				pageInfo: {
					hasNextPage,
					endCursor: newCursor,
				},
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
			let newCursor = after;
			if (after) {
				startIdx = items.findIndex((book) => book._id.toString() === after) + 1;
			}
			let target = items.slice(startIdx, startIdx + first + 1);
			if (target.length > first) {
				hasNextPage = true;
				target = target.slice(0, -1);
				newCursor = target[target.length - 1]._id;
			} else if (target.length > 0) {
				newCursor = target[target.length - 1]._id;
			}
			// console.log("target: ", target);
			const books = await models.Book.find({
				_id: {
					$in: target,
				},
			});
			const edges = books.map((book) => {
				return { node: book, cursor: book._id };
			});
			return {
				edges,
				pageInfo: {
					hasNextPage,
					endCursor: newCursor,
				},
			};
		},
	},
};

module.exports = {
	categoryType,
	categoryResolver,
};
