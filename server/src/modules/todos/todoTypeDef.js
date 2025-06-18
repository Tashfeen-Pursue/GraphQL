const { gql } = require("graphql-tag");

const todoTypeDefs = gql`
  type Todo {
    id: ID!
    title: String!
    completed: Boolean!
  }

  type Query {
    getAllTodos: [Todo]
    getSingleTodo: Todo
  }
`;

module.exports = todoTypeDefs;
