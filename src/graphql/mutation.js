const mutationType = `
  type Mutation{
    "注册、登录，成功时返回一个JWT，失败时？"
    signUp(name: String!, email: String!, password: String!): SignInOutResponse!
    signIn(email: String!, password: String!): SignInOutResponse!
    toggleBookshelf(bookId: ID!, userId: ID!): toggleBookshelfResponse!
    addComment(bookId: ID!, userId: ID!, content: String!, rating: Int, created: DateTime!): addCommentResponse!
    deleteComment(bookId: ID!, commentId: ID!): deleteCommentResponse!
    updateComment(commentId: ID!, rating: Int!, content: String, updatedAt: DateTime!): updateCommentResponse!
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
    book: Book
  }

  type addCommentResponse implements MutationResponse {
    code: String!
    success: Boolean!
    message: String!
    book: Book
    comment: Comment
  }

  type deleteCommentResponse implements MutationResponse {
    code: String!
    success: Boolean!
    message: String!
    book: Book
  }

  type updateCommentResponse implements MutationResponse {
    code: String!
    success: Boolean!
    message: String!
    comment: Comment
  }

  type SignInOutResponse {
    id: ID
    token: String
  }
`;

module.exports = {
	mutationType,
};
