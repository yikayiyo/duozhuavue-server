const mutationType = `
  type Mutation{
    "注册、登录，成功时返回一个JWT，失败时？"
    signUp(name: String!, email: String!, password: String!): String!
    signIn(email: String!, password: String!): String!
  }
`;

module.exports = {
	mutationType,
};
