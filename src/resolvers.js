const { DateTimeResolver } = require("graphql-scalars");
const { merge } = require("lodash");
const resolvers = {
	DateTime: DateTimeResolver,
};
const { bookResolver } = require("./graphql/book.js");
const { userResolver } = require("./graphql/user.js");
const { collectionResolver } = require("./graphql/collection.js");
const { contributionResolver } = require("./graphql/contribution.js");

module.exports = {
	resolvers: merge(
		resolvers,
		bookResolver,
		userResolver,
		collectionResolver,
		contributionResolver
	),
};
