const queryType = `
  type Query{
    book(id: ID!): Book!
    books: [Book!]
    user(id: ID!): User!
    good(id: ID!): Good!
  }
`;

module.exports = {
	queryType,
};
