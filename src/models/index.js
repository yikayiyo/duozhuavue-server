const Book = require("./book");
const User = require("./user");
const Good = require("./good");
const Collection = require("./collection");
const Contribution = require("./contribution");
const Category = require("./category");
const Comment = require("./comment");

const models = {
	Book,
	User,
	Good,
	Collection,
	Contribution,
	Category,
	Comment,
};

module.exports = models;
