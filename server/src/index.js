const express = require("express");
const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");
const todo = require("./modules/todos/index")
const course = require("./modules/courses/index")
const {mergeTypeDefs, mergeResolvers} = require("@graphql-tools/merge")

const app = express();
const port = 8000;

// Merge all typeDefs and resolvers
const typeDefs = mergeTypeDefs([
  todo.typeDefs,
  course.typeDefs
]);

const resolvers = mergeResolvers([
  todo.resolvers,
  course.resolvers,
]);

const startServer = async () => {
  app.use(express.json())
  const server = new ApolloServer({ typeDefs, resolvers});
  await server.start();

  app.use(
    "/graphql",
    express.json(),
    expressMiddleware(server)
  );

  app.listen(port, () => console.log(`Server is running on port ${port}`));
};

startServer();
