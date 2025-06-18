const axios = require("axios");

const todoResolvers = {
  Query: {
    getAllTodos: async () => {
      const response = await axios.get("https://jsonplaceholder.typicode.com/todos");
      return response.data;
    },

    getSingleTodo: async (parent, {id}) => {
        const response = await axios.get(`https://jsonplaceholder.typicode.com/todos/${id}`);
        return response.data;
    }
  },
};

module.exports = todoResolvers;
