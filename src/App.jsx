import { useEffect, useState } from "react";
import Todos from "./components/TodoList";

const BASE_URL = "https://todo-backend-0ar5.onrender.com";

function App() {
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTodos = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("No token found");
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
        setTodos(data.todos || []); // Ensure it's an array
      } catch (err) {
        setError(err.message);
      }
    };

    fetchTodos();
  }, []);

  return (
    <div>
      <h1>Todo List</h1>
      {error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : (
        <ul>
          {todos.length > 0 ? (
            todos.map((todo) => <li key={todo._id}>{todo.title}</li>)
          ) : (
            <li>No todos found.</li>
          )}
        </ul>
      )}
    </div>
  );
}

export default App;
