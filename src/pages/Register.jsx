import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    if (!email) {
        alert('Please enter your email address.');
        return; 
    }
    if (!password) {
        alert('Please choose a password.');
        return;
    }

    try {
        await axios.post('https://todo-backend-0ar5.onrender.com/api/auth/register', {
            email,
            password
        });
        alert('Registration successful! You can now log in.');
        window.location.href = '/';
    } catch (err) {
        console.error(err.response?.data || err.message);
        alert(err.response?.data?.message || 'Registration failed');
    }
};

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-[#f5eaff]">

      <div className="h-96 flex items-center justify-center bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
        <div className="relative">
          <div className="absolute -top-2 -left-2 -right-2 -bottom-2 rounded-lg bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 shadow-lg animate-pulse"></div>
          <div id="form-container" className="bg-white flex flex-col gap-5 p-16 rounded-lg shadow-2xl w-80 relative z-10 transform transition duration-500 ease-in-out">
            <h2 id="form-title" className="text-center text-3xl font-bold mb-10 text-gray-800">Register</h2>
            <input className="w-full h-12 border border-gray-800 px-3 rounded-lg" placeholder="Enter Email" type="email" id='email' value={email} onChange={(e) => setEmail(e.target.value)}/>
            <input className="w-full h-12 border border-gray-800 px-3 rounded-lg" placeholder="Choose password" type="password" id='password' value={password} onChange={(e) => setPassword(e.target.value)} />


            <button className="relative flex items-center px-6 py-3 overflow-hidden font-medium transition-all bg-indigo-500 rounded-md group" onClick={handleRegister}>
              <span className="absolute top-0 right-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-indigo-700 rounded group-hover:-mr-4 group-hover:-mt-4">
                <span className="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white"></span>
              </span>
              <span className="absolute bottom-0 rotate-180 left-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-indigo-700 rounded group-hover:-ml-4 group-hover:-mb-4">
                <span className="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white"></span>
              </span>
              <span className="absolute bottom-0 left-0 w-full h-full transition-all duration-500 ease-in-out delay-200 -translate-x-full bg-indigo-600 rounded-md group-hover:translate-x-0"></span>
              <span className="relative w-full text-center text-white transition-colors duration-200 ease-in-out group-hover:text-white">Register</span>
            </button>
            <Link to="/" className="text-blue-600 hover:underline">Already registered? Login</Link>

          </div>
        </div>
      </div>


    </div>
  );
};

export default Register;
