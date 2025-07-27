const BASE_URL = 'https://codexintern-backend.onrender.com/api';
import axios from "./axios";

// REGISTER
export const registerUser = async (userData) => {
  const res = await axios.post("/auth/register", userData);
  return res.data;
};

// LOGIN
export const loginUser = async (userData) => {
  const res = await axios.post("/auth/login", userData);
  return res.data;
};

// GET ALL TODOS
export const getTodos = async () => {
  const res = await axios.get("/todo");
  return res.data;
};

// ADD TODO
export const addTodo = async (data) => {
  const res = await axios.post("/todo", data);
  return res.data;
};

// DELETE TODO
export const deleteTodo = async (id) => {
  const res = await axios.delete(`/todo/${id}`);
  return res.data;
};

// UPDATE TODO
export const updateTodo = async (id, data) => {
  const res = await axios.put(`/todo/${id}`, data);
  return res.data;
};

