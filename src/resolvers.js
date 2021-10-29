const { merge } = require("lodash");
const resolvers = {};
const { bookResolver } = require("./graphql/book.js");
const { userResolver } = require("./graphql/user.js");

module.exports = {
	resolvers: merge(resolvers, bookResolver, userResolver),
};
