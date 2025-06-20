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

export const UPDATE_STUDENT = gql`
  mutation UpdateStudent($name: String, $rollNo: String!, $dept: String) {
    updateStudent(name: $name, rollNo: $rollNo, dept: $dept) {
      name
      rollNo
      dept
    }
  }
`;

export const DELETE_STUDENT = gql`
  mutation DeleteStudent($rollNo: String!) {
    deleteStudent(rollNo: $rollNo)
  }
`;
