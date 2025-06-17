const express = require("express");
const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");
const axios = require("axios");
const port = 8000;

let courses = [
  { id: "1", name: "PF", teacher: "Yahya Khurram", enrollments: 50 },
  { id: "2", name: "OOP", teacher: "Atif Ishaq", enrollments: 45},
  { id: "3", name: "DSA", teacher: "Turk Hussain", enrollments: 65},
  { id: "4", name: "DB", teacher: "Muhammad Hafeez", enrollments: 40},
  { id: "5", name: "Computer Networks", teacher: "Awais Qasim", enrollments: 30},
];

const typeDefs = `

  type Todo {
    id: ID!
    title: String
    completed: Boolean
  }

  type User {
    id: ID!,
    name: String!
    email: String!
    phone: String!
    website: String!
  }

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
    getAllTodos: [Todo]
    getAllUsers: [User]
    getUserById(id: ID!): User
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

const resolvers = {

  Query: {
    // get all todos from json placehodler api
    getAllTodos: async () => {
      const response = await axios.get("https://jsonplaceholder.typicode.com/todos");
      return response.data;
    },

    // get all users from json placeholder api
    getAllUsers: async () => {
        const response = await axios.get("https://jsonplaceholder.typicode.com/users");
        return response.data;
    },

    // get single user by id
    getUserById: async (parent, {id}) => {
        const response = await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`)
        return response.data
    },

    // get all courses
    getAllCourses: () => courses,

    // get single course by ID
    getCourseById: (parent, {id}) => courses.find(course => course.id === id),

    // get popular courses (enrollments >= 40)
    getPopularCourses: () => courses.filter(course => course.enrollments >= 40)
  },

  Mutation: {

    // add new course
    addCourse: (parent, {input}) => {
        const newCourse = input;
        courses.push(newCourse)
        return newCourse;
    },

    // update course
    updateCourse: (parent, {input}) => {
        // first check if course index exist or not
        const index = courses.findIndex(course => course.id === input.id)
        if (index === -1) throw new Error("Course not found!")
        
        // now update course
        courses[index] = {...courses[index], ...input}
        return courses[index]
    },

    // delete course
    deleteCourse: (parent, {id}) => {
        const index = courses.findIndex(course => course.id === id)
        if (index === -1) throw new Error("Course not found!")

        courses.splice(index, 1)
        return `Course with ID ${id} deleted successfully!`
    }
  }

};

const startServer = async () => {
  const app = express();
  app.use(express.json())
  const server = new ApolloServer({ typeDefs, resolvers });
  await server.start();

  app.use(
    "/graphql",
    express.json(),
    expressMiddleware(server)
  );

  app.listen(port, () => console.log(`Server is running on port ${port}`));
};

startServer();
