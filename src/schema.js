const { gql } = require("apollo-server");
const { queryType } = require("./graphql/query.js");
const { bookType } = require("./graphql/book.js");
const { goodType } = require("./graphql/good.js");
const { userType } = require("./graphql/user.js");
const { collectionType } = require("./graphql/collection.js");
const { contributionType } = require("./graphql/contribution.js");

module.exports = gql`
	scalar DateTime
	${queryType}
	${bookType}
	${goodType}
	${userType}
	${collectionType}
	${contributionType}
`;
