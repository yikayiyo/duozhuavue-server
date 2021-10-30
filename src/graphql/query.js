const queryType = `
  type Query{
    book(id: ID!): Book!
    books: [Book!]
    user(id: ID!): User!
    good(id: ID!): Good!
    collection(id: ID!): Collection!
    collections: [Collection!]
    contribution(id: ID!): Contribution!
  }
`;

module.exports = {
	queryType,
};
