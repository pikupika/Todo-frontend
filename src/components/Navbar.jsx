import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate('/login');
  };

  return (
    <div className="bg-black text-white p-4 flex justify-between">
      <h2>Todo App</h2>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Navbar;
