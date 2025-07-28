import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState('');
  const token = localStorage.getItem('token');

  const fetchTodos = async () => {
    try {
      const res = await axios.get('https://todo-backend-0ar5.onrender.com/api/todos', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTodos(res.data);
    } catch (err) {
      console.error('Failed to fetch todos:', err);
    }
  };

  const addTodo = async () => {
    try {
      await axios.post('https://todo-backend-0ar5.onrender.com/api/todos', { text }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setText('');
      fetchTodos();
    } catch (err) {
      console.error('Failed to add todo:', err);
    }
  };

  const markAsRead = async (id) => {
    try {
      await axios.patch(`https://todo-backend-0ar5.onrender.com/api/todos/${id}/read`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchTodos();
    } catch (err) {
      console.error('Failed to mark as read:', err);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`https://todo-backend-0ar5.onrender.com/api/todos/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchTodos();
    } catch (err) {
      console.error('Failed to delete todo:', err);
    }
  };

  const navigate = useNavigate();

useEffect(() => {
  if (!token) {
    navigate('/');
  }
}, []);

  const handleLogout = () => {
  localStorage.removeItem('token');
  window.location.href = '/';
};


  return (
    <div className="p-4 max-w-2xl mx-auto">
      <button className="text-red-500 mb-4" onClick={handleLogout}>
  Logout
</button>

      <h1 className="text-2xl font-bold mb-4">Your Todos 📝</h1>
      <div className="flex gap-2 mb-4">
        <input
          className="border p-2 flex-grow rounded"
          value={text}
          placeholder="Enter a task..."
          onChange={(e) => setText(e.target.value)}
        />
        <button className="bg-green-500 text-white px-4 py-2 rounded" onClick={addTodo}>Add</button>
      </div>
      <ul>
        {todos.map(todo => (
          <li key={todo._id} className="flex justify-between items-center mb-2 p-2 border rounded bg-white shadow-sm">
            <span className={todo.read ? 'line-through text-gray-500' : ''}>{todo.text}</span>
            <div className="flex gap-2">
              {!todo.read && (
                <button className="text-blue-500 hover:underline" onClick={() => markAsRead(todo._id)}>Mark Read</button>
              )}
              <button className="text-red-500 hover:underline" onClick={() => deleteTodo(todo._id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
