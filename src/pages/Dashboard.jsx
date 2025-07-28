import { useEffect, useState } from "react";
import { fetchTodos, createTodo, updateTodo, deleteTodo } from "../api/auth";
import TodoItem from "../components/TodoItem";
import Navbar from "../components/Navbar";

export default function TodoList() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    getTodos(); 
  }, []);

  const getTodos = async () => {
    const data = await fetchTodos();
    setTodos(data);
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    await createTodo({ text });
    setText("");
    getTodos();
  };

  const handleUpdate = async (id) => {
    await updateTodo(id, { completed: true });
    getTodos();
  };

  const handleDelete = async (id) => {
    await deleteTodo(id);
    getTodos();
  };

  return (
    <>
      <Navbar />
      <div className="p-4">
        <form onSubmit={handleAdd} className="mb-4">
          <input value={text} onChange={(e) => setText(e.target.value)} className="border p-2 mr-2" />
          <button className="bg-blue-600 text-white px-4 py-2">Add</button>
        </form>
        {todos.map((todo) => (
          <TodoItem key={todo._id} todo={todo} onUpdate={handleUpdate} onDelete={handleDelete} />
        ))}
      </div>
    </>
  );
}
