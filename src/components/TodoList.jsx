import React, { useEffect, useState } from "react";

const BASE_URL = "https://your-backend-name.onrender.com"; // ✅ replace this with your Render backend URL

const TodoList = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    // ✅ Fetch todos from backend
    const fetchTodos = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/todos`);
        const data = await res.json();
        setTodos(data);
      } catch (err) {
        console.error("Error fetching todos:", err);
      }
    };

    fetchTodos();
  }, []);

  return (
    <div className="todo-list">
      <h2 className="text-xl font-semibold mb-4">Your Todos</h2>
      <ul>
        {todos.map((todo) => (
          <li key={todo._id}>{todo.text}</li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
