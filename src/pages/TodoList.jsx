import { useEffect, useState } from 'react';
import axios from '../api/axios';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  const fetchTodos = async () => {
    const token = localStorage.getItem('token');
    const res = await axios.get('/todo', {
      headers: { Authorization: `Bearer ${token}` }
    });
    setTodos(res.data);
  };

  const addTodo = async () => {
    const token = localStorage.getItem('token');
    await axios.post('/todo', { task: newTodo }, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setNewTodo('');
    fetchTodos();
  };

  const deleteTodo = async (id) => {
    const token = localStorage.getItem('token');
    await axios.delete(`/todo/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    fetchTodos();
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div>
      <h1>Your Todos</h1>
      <input value={newTodo} onChange={e => setNewTodo(e.target.value)} />
      <button onClick={addTodo}>Add</button>
      <ul>
        {todos.map(todo => (
          <li key={todo._id}>
            {todo.task}
            <button onClick={() => deleteTodo(todo._id)}>X</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
