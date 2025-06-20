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

export const ADD_NEW_STUDENT = gql`
  mutation AddStudent($name: String!, $rollNo: String!, $dept: String!) {
    addStudent(name: $name, rollNo: $rollNo, dept: $dept) {
      name
      rollNo
      dept
    }
  }
`;