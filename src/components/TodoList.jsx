import { useEffect, useState } from "react";

export default function Todos() {
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState("");

  const BASE_URL = "https://todo-backend-0ar5.onrender.com";

  useEffect(() => {
    const fetchTodos = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("No token found. Please login.");
        return;
      }

      try {
        const res = await fetch(`${BASE_URL}/api/todos`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          const msg = await res.text();
          throw new Error(`Error ${res.status}: ${msg}`);
        }

        const data = await res.json();
        setTodos(data.todos || []);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchTodos();
  }, []);

  return (
    <div className="p-6 bg-white shadow rounded">
      <h1 className="text-2xl font-bold mb-4">Todos</h1>

      {error && <p className="text-red-500">{error}</p>}

      {todos.length > 0 ? (
        <ul>
          {todos.map((todo) => (
            <li key={todo._id} className="mb-2 border-b pb-2">
              {todo.text}
            </li>
          ))}
        </ul>
      ) : (
        !error && <p>No todos found</p>
      )}
    </div>
  );
}
