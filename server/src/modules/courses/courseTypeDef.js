const { gql } = require("graphql-tag");

const todoTypeDefs = gql`

  type Course {
    id: ID!
    name: String!
    teacher: String!
    enrollments: Int!
  }

  input AddCourseInput {
    id: ID!
    name: String!
    teacher: String!
    enrollments: Int!
  }

  input UpdateCourseInput {
    id: ID!
    name: String!
    teacher: String!
    enrollments: Int!
  }

  type Query {
    getAllCourses: [Course]
    getCourseById(id: ID!): Course
    getPopularCourses: [Course]
  }

  type Mutation {
    addCourse(input: AddCourseInput!): Course
    updateCourse(input: UpdateCourseInput!): Course
    deleteCourse(id: ID!): String
  }
`;

module.exports = todoTypeDefs;
