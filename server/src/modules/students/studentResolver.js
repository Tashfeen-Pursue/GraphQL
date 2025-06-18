const { Student } = require("./studentModel");

const resolvers = {
  Query: {
    // fetch all the students
    getAllStudents: async () => await Student.find(),

    // fetch student by rollNo
    getSingleStudent: async (parent, { rollNo }) => {
      return await Student.findOne({ rollNo });
    },
  },

  Mutation: {
    // add new student
    addStudent: async (parent, { name, rollNo, dept }) => {
      const student = new Student({ name, rollNo, dept });
      return await student.save();
    },

    // update student
    updateStudent: async (parent, { name, rollNo, dept }) => {
      const student = await Student.findOne({ rollNo });
      if (!student) throw new Error("Student not found!");

      student.name = name;
      student.dept = dept;
      return await student.save();
    },

    // delete student
    deleteStudent: async (parent, { rollNo }) => {
      const student = await Student.findOne({ rollNo });
      if (!student) throw new Error("Student not found!")

      await Student.deleteOne({ rollNo: student.rollNo });
      return "Student deleted successfully!";
    },
  },
};

module.exports = resolvers;
