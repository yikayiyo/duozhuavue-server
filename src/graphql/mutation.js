const mutationType = `
  type Mutation{
    signUp(name: String!, email: String!, password: String!): String!
    signIn(email: String!, password: String!): String!
  }
`;

module.exports = {
	mutationType,
};
