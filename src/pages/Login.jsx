import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post('https://todo-backend-0ar5.onrender.com/api/auth/login', {
        username,
        password
      });
      localStorage.setItem('token', res.data.token);
      navigate('/dashboard');
    } catch (err) {
      alert('Login failed');
    }
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-2xl mb-6 font-bold">Login</h1>
      <input className="mb-2 p-2 border rounded" placeholder="Username" onChange={e => setUsername(e.target.value)} />
      <input className="mb-4 p-2 border rounded" type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
      <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleLogin}>Login</button>
      <Link to="/register" className="text-blue-600 hover:underline">Don't have an account? Register</Link>
    </div>
  );
};

export default Login;
