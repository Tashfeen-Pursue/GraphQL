const typeDefs = `
    type Student {
        name: String!
        rollNo: String!
        dept: String!
    }

    type Query {
        getAllStudents: [Student]
        getSingleStudent(rollNo: String!): Student
    }

    input AddStudentInput {
        name: String!
        rollNo: String!
        dept: String!
    }

    input UpdateStudentInput {
        name: String!
        rollNo: String!
        dept: String!
    }

    type Mutation {
        addStudent(name: String!, rollNo: String!, dept: String!): Student
        updateStudent(name: String!, rollNo: String!, dept: String!): Student
        deleteStudent(rollNo: String!): String
    }

`;

module.exports = typeDefs;
