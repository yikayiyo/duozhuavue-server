const jwt = require("jsonwebtoken");
require("dotenv").config();

const getUser = (token) => {
	if (token) {
		try {
			return jwt.verify(token, process.env.JWT_SECRET);
		} catch (err) {
			throw new Error("Session invalid");
		}
	}
};

module.exports = {
	getUser,
};
