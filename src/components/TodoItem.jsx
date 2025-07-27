import React from 'react';

const TodoItem = ({ todo, onUpdate, onDelete }) => {
  return (
    <div className="bg-white p-4 rounded shadow mb-2 flex justify-between items-center">
      <span className={todo.completed ? 'line-through text-gray-400' : ''}>
        {todo.text}
      </span>
      <div className="flex gap-2">
        <button onClick={() => onUpdate(todo._id)} className="text-blue-500">Mark</button>
        <button onClick={() => onDelete(todo._id)} className="text-red-500">Delete</button>
      </div>
    </div>
  );
};

export default TodoItem;
