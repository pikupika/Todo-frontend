import { useEffect, useState } from "react";

const BASE_URL = "https://your-render-name.onrender.com"; // ✅ Your Render backend URL

function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
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
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4">Your Todos</h1>
        {todos.length === 0 ? (
          <p>No todos found.</p>
        ) : (
          <ul className="list-disc pl-5 space-y-2">
            {todos.map((todo) => (
              <li key={todo._id}>{todo.text}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default App;
