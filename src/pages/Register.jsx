import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../api/auth';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await registerUser({ email, password });
      navigate('/login'); 
    } catch (error) {
      alert('Registration failed');
    }
  };

  return (
    <form onSubmit={handleRegister} className="p-4 max-w-md mx-auto mt-10 bg-white shadow-md">
      <h2 className="text-xl font-bold mb-4">Register</h2>
      <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" className="input" required />
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" className="input mt-2" required />
      <button type="submit" className="btn mt-4">Register</button>
    </form>
  );
};

export default Register;