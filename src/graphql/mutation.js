const mutationType = `
  type Mutation{
    "注册、登录，成功时返回一个JWT，失败时？"
    signUp(name: String!, email: String!, password: String!): SignInOutResponse!
    signIn(email: String!, password: String!): SignInOutResponse!
    toggleBookshelf(bookId: ID!, userId: ID!): toggleBookshelfResponse!
  }

  interface MutationResponse {
    code: String!
    success: Boolean!
    message: String!
  }

  type toggleBookshelfResponse implements MutationResponse {
    code: String!
    success: Boolean!
    message: String!
    user: User
  }

  type SignInOutResponse {
    id: ID
    token: String
  }
`;

module.exports = {
	mutationType,
};
