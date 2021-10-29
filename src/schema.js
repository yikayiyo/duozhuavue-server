const { gql } = require("apollo-server");
const { queryType } = require("./graphql/query.js");
const { bookType } = require("./graphql/book.js");
const { goodType } = require("./graphql/good.js");
const { userType } = require("./graphql/user.js");

module.exports = gql`
	${queryType}
	${bookType}
	${goodType}
	${userType}
`;
