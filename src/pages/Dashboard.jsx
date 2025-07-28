import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState('');
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

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

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/';
  };

  useEffect(() => {
    if (!token) navigate('/');
    fetchTodos();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-50 to-gray-100 p-6">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Your Todos 📝</h1>
          <button
            onClick={handleLogout}
            className="text-red-600 hover:text-red-800 font-medium transition duration-200"
          >
            Logout
          </button>
        </div>

        <div className="flex gap-3 mb-6">
          <input
            className="flex-grow px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 outline-none"
            value={text}
            placeholder="Enter a task..."
            onChange={(e) => setText(e.target.value)}
          />
          <button
            onClick={addTodo}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-medium transition duration-200"
          >
            Add
          </button>
        </div>

        <ul className="space-y-3">
          {todos.map((todo) => (
            <li
              key={todo._id}
              className="flex justify-between items-center bg-gray-50 border rounded-lg px-4 py-3 shadow-sm animate-fade-in"
            >
              <span className={`text-lg ${todo.read ? 'line-through text-gray-400' : 'text-gray-800'}`}>
                {todo.text}
              </span>
              <div className="flex gap-3">
                {!todo.read && (
                  <button
                    onClick={() => markAsRead(todo._id)}
                    className="text-green-600 hover:text-green-800 transition duration-200"
                  >
                    Mark Read
                  </button>
                )}
                <button
                  onClick={() => deleteTodo(todo._id)}
                  className="text-red-500 hover:text-red-700 transition duration-200"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
