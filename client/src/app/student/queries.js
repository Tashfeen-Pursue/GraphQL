const { gql } = require("@apollo/client");

export const GET_STUDENTS = gql`
  query {
    getAllStudents {
      name
      rollNo
      dept
    }
  }
`;