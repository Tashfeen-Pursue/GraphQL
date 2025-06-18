const express = require("express");
const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");
const todo = require("./modules/todos/index");
const course = require("./modules/courses/index");
const { mergeTypeDefs, mergeResolvers } = require("@graphql-tools/merge");
const connectMongoDB = require("./config/connection/db");
const student = require("./modules/students/index")

const app = express();
const port = 8000;

// Merge all typeDefs and resolvers
const typeDefs = mergeTypeDefs([todo.typeDefs, course.typeDefs, student.typeDefs]);

const resolvers = mergeResolvers([todo.resolvers, course.resolvers, student.resolvers]);

const startServer = async () => {
  // connect MongoDB
  await connectMongoDB();

  // create new apollo server
  const server = new ApolloServer({ typeDefs, resolvers });
  await server.start();

  app.use(express.json());
  app.use("/graphql", express.json(), expressMiddleware(server));

  app.listen(port, () => console.log(`Server is running on port ${port}`));
};

startServer();
