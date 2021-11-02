require("dotenv").config();
const { ApolloServer } = require("apollo-server-express");
const { ApolloServerPluginDrainHttpServer } = require("apollo-server-core");

const DB_HOST = process.env.DB_HOST;
const port = process.env.PORT || 5000;

const db = require("./db");
db.connect(DB_HOST);
const models = require("./models");

const express = require("express");
const http = require("http");

const typeDefs = require("./schema.js");
const { resolvers } = require("./resolvers.js");

const { getUser } = require("./utils.js");

async function startApolloServer(typeDefs, resolvers) {
	const app = express();
	const httpServer = http.createServer(app);
	const server = new ApolloServer({
		typeDefs,
		resolvers,
		context: async ({ req }) => {
			const token = req.headers.authorization;
			const user = getUser(token);
			console.log("current user: ", user);
			return { models, user };
		},
		plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
	});
	await server.start();
	server.applyMiddleware({ app });
	await new Promise((resolve) => httpServer.listen({ port: port }, resolve));
	console.log(
		`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`
	);
}

startApolloServer(typeDefs, resolvers);
