const { courses } = require("./courseData");

const courseResolver = {

  Query: {
    
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

module.exports = courseResolver;
