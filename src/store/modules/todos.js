import axios from 'axios';

const state = {
  todos: []
};

const getters = {
  allTodos: state => state.todos
};

const actions = {
  async fetchTodos({ commit }) {
    const response = await axios.get(
       //  'http://admin.test/api/todos'
    // 'https://jsonplaceholder.typicode.com/todos'
      'https://anyar-online.herokuapp.com/api/todos'
    );
    commit('setTodos', response.data);
  },
  async addTodo({ commit }, title) {
    const response = await axios.post(
          // 'https://jsonplaceholder.typicode.com/todos',
    // 'https://anyar-online.herokuapp.com/api/todos'
   //'http://admin.test/api/create',
      'https://anyar-online.herokuapp.com/api/create',
      { title, completed: false }
    );
    commit('newTodo', response.data);
  },
  async deleteTodo({ commit }, id) {
    // await axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`);
   // await axios.delete(`http://admin.test/api/todos/delete?_id=${id}`);
    await axios.delete(`https://anyar-online.herokuapp.com/api/todos/delete?_id=${id}`);
    commit('removeTodo', id);
  },
  async filterTodos({ commit }, e) {
    // Get selected dblclic
    const limit = parseInt(
      e.target.options[e.target.options.selectedIndex].innerText
    );
    const response = await axios.get(
     // `https://jsonplaceholder.typicode.com/todos?_limit=${limit}`
       // `http://admin.test/api/filter?_limit=${limit}`
     `https://anyar-online.herokuapp.com/api/filter?_limit=${limit}`
    );
    commit('setTodos', response.data);
  },
  async updateTodo({ commit }, updTodo) {
    const response = await axios.put(
          //`https://jsonplaceholder.typicode.com/todos/${updTodo.id}`,
    `https://anyar-online.herokuapp.com/api/update/${updTodo.id}`,
    //  `http://admin.test/api/todo/update/${updTodo.id}`,
      updTodo
    );

    //console.log(response.data);

    commit('updateTodo', response.data);
  }
};

const mutations = {
  setTodos: (state, todos) => {
    state.todos = todos;
  },
  newTodo: (state, todo) => {
    state.todos = todo;
    // state.todos.unshift(todo);
  },
  removeTodo: (state, id) =>
    (state.todos = state.todos.filter(todo => todo.id !== id)),
  updateTodo: (state, updTodo) => {
    const index = state.todos.findIndex(todo => todo.id === updTodo.id);
    if (index !== -1) {
      state.todos.splice(index, 1, updTodo);
    }
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
