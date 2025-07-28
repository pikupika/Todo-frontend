import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    try {
      await axios.post('https://todo-backend-0ar5.onrender.com/api/auth/register', {
        username,
        password
      });
      alert('Registration successful! You can now log in.');
      window.location.href = '/';
    } catch (err) {
      alert('Registration failed');
      console.error(err);
    }
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-50">
      <h1 className="text-2xl font-bold mb-6">Register</h1>
      <input
        className="mb-2 p-2 border rounded w-64"
        placeholder="Choose username"
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        className="mb-4 p-2 border rounded w-64"
        type="password"
        placeholder="Choose password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="bg-purple-600 text-white px-4 py-2 rounded" onClick={handleRegister}>
        Register
      </button>
      <Link to="/" className="text-blue-600 hover:underline">Already registered? Login</Link>

    </div>
  );
};

export default Register;
