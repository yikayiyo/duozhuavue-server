const imageType = `
	type Image {
		id: ID!
		original: String!
    small: String!
    medium: String!
    large: String!
	}
`;

const imageResolver = {};

module.exports = {
	imageType,
	imageResolver,
};
