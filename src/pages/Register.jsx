// src/pages/Register.jsx
import { useState } from 'react';
import { registerUser } from '../api/auth';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await registerUser({ email, password });
      navigate('/login');
    } catch (err) {
      alert('Registration failed');
    }
  };

  return (
    <form onSubmit={handleRegister}>
      <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
      <button type="submit">Register</button>
    </form>
  );
};

export default Register;
