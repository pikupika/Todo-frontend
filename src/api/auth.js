import axios from './axios';

export const registerUser = async (userData) => {
  const res = await axios.post('/auth/register', userData);
  return res.data;
};

export const loginUser = async (userData) => {
  const res = await axios.post('/auth/login', userData);
  return res.data;
};

export const fetchTodos = async () => {
  const res = await axios.get('/todos');
  return res.data;
};

export const createTodo = async (todoData) => {
  const res = await axios.post('/todos', todoData);
  return res.data;
};

export const updateTodo = async (id, updatedData) => {
  const res = await axios.put(`/todos/${id}`, updatedData);
  return res.data;
};

export const deleteTodo = async (id) => {
  const res = await axios.delete(`/todos/${id}`);
  return res.data;
};
