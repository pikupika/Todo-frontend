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
    <div className="min-h-screen bg-gradient-to-tr from-indigo-100 via-white to-pink-100 px-4 py-8">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-8 transition-all duration-500">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-indigo-600">📝 Your Todos</h1>
          <button
            className="text-red-500 hover:text-red-700 font-medium"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>

        <div className="flex gap-2 mb-6">
          <input
            className="flex-grow border border-gray-300 p-3 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-300 outline-none transition"
            value={text}
            placeholder="Enter a task..."
            onChange={(e) => setText(e.target.value)}
          />
          <button
            className="bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600 transition"
            onClick={addTodo}
          >
            Add
          </button>
        </div>

        <ul className="space-y-4">
          {todos.map((todo, index) => (
            <li
              key={todo._id}
              className="flex justify-between items-center bg-gray-50 px-4 py-3 rounded-xl shadow-sm border transition transform hover:scale-[1.01]"
              style={{ animation: `fadeIn 0.3s ease ${index * 0.1}s both` }}
            >
              <span className={`${todo.read ? 'line-through text-gray-400' : 'text-gray-800'} text-lg`}>
                {todo.text}
              </span>
              <div className="flex gap-2 text-sm">
                {!todo.read && (
                  <button
                    className="text-blue-500 hover:text-blue-700 transition"
                    onClick={() => markAsRead(todo._id)}
                  >
                    Mark Read
                  </button>
                )}
                <button
                  className="text-red-500 hover:text-red-700 transition"
                  onClick={() => deleteTodo(todo._id)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <style>{`
        @keyframes fadeIn {
          0% { opacity: 0; transform: translateY(10px); }
          100% { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default Dashboard;
