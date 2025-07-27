import React, { useEffect, useState } from 'react';
import API from '../api/axios';
import { useNavigate } from 'react-router-dom';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const navigate = useNavigate();

  const fetchTodos = async () => {
    try {
      const { data } = await API.get('/todos');
      setTodos(data);
    } catch (err) {
      alert('Failed to load todos');
    }
  };

  const markDone = async (id) => {
    await API.patch(`/todos/${id}`, { isCompleted: true });
    fetchTodos();
  };

  const deleteTodo = async (id) => {
    await API.delete(`/todos/${id}`);
    fetchTodos();
  };

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div>
      <button onClick={logout}>Logout</button>
      <h2>Your Todos</h2>
      {todos.map(todo => (
        <div key={todo._id}>
          <span style={{ textDecoration: todo.isCompleted ? 'line-through' : 'none' }}>{todo.title}</span>
          {!todo.isCompleted && <button onClick={() => markDone(todo._id)}>Mark Done</button>}
          <button onClick={() => deleteTodo(todo._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default TodoList;
