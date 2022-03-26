const queryType = `
  type Query{
    book(id: ID!): Book!
    books: [Book!]
    user(id: ID!): User!
    good(id: ID!): Good!
    collection(id: ID!): Collection!
    collections: [Collection!]
    contribution(id: ID!): Contribution!
    category(id: ID!): Category!
    categories: [Category!]
    topCategories: [Category!]
    categoryFeed(first: Int, after: String): CategoryConnection
    comment(id: ID!): Comment!
  }
`;

module.exports = {
	queryType,
};
