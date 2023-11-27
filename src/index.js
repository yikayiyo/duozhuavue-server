const {
  ApolloServerPluginLandingPageProductionDefault,
  ApolloServerPluginLandingPageLocalDefault
} = require('apollo-server-core')

require('dotenv').config()
const { ApolloServer } = require('apollo-server-express')
const { ApolloServerPluginDrainHttpServer } = require('apollo-server-core')

const DB_HOST = process.env.DB_HOST
const port = process.env.PORT || 5000

const db = require('./db')
db.connect(DB_HOST)
const models = require('./models')

const express = require('express')
const helmet = require('helmet')
const cors = require('cors')

let corsOptions = { optionsSuccessStatus: 200 }
if (process.env.NODE_ENV !== 'dev') {
  corsOptions.origin = RegExp(process.env.ORIGIN_PRODUCTION)
}
const http = require('http')

const typeDefs = require('./schema.js')
const { resolvers } = require('./resolvers.js')

const { getUser } = require('./utils.js')

async function startApolloServer(typeDefs, resolvers) {
  const app = express()
  if (process.env.NODE_ENV !== 'dev') {
    app.use(helmet())
    app.use(cors(corsOptions))
  }
  const httpServer = http.createServer(app)
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req }) => {
      const token = req.headers.authorization
      const user = getUser(token)
      return { models, user }
    },
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      process.env.NODE_ENV === 'production'
        ? ApolloServerPluginLandingPageProductionDefault()
        : ApolloServerPluginLandingPageLocalDefault({ footer: false })
    ]
  })
  await server.start()
  server.applyMiddleware({ app })
  await new Promise((resolve) => httpServer.listen({ port: port }, resolve))
  console.log(
    `🚀 Server ready at http://localhost:${port}${server.graphqlPath}`
  )
}

startApolloServer(typeDefs, resolvers)
