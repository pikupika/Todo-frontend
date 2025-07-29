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
    <div className="h-screen flex flex-col items-center justify-center bg-[#f5eaff]">
      
      <div class="h-96 flex items-center justify-center bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
        <div class="relative">
          <div class="absolute -top-2 -left-2 -right-2 -bottom-2 rounded-lg bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 shadow-lg animate-pulse"></div>
          <div id="form-container" class="bg-white flex flex-col gap-5 p-16 rounded-lg shadow-2xl w-80 relative z-10 transform transition duration-500 ease-in-out">
            <h2 id="form-title" class="text-center text-3xl font-bold mb-10 text-gray-800">Login</h2>
            <input class="w-full h-12 border border-gray-800 px-3 rounded-lg" placeholder="username" id="username" type="text" onChange={e => setUsername(e.target.value)}/>
              <input class="w-full h-12 border border-gray-800 px-3 rounded-lg" placeholder="Password" id="password" type="text" onChange={e => setPassword(e.target.value)}/>
                
                
                <button class="relative flex items-center px-6 py-3 overflow-hidden font-medium transition-all bg-indigo-500 rounded-md group" onClick={handleLogin}>
                  <span class="absolute top-0 right-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-indigo-700 rounded group-hover:-mr-4 group-hover:-mt-4">
                    <span class="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white"></span>
                  </span>
                  <span class="absolute bottom-0 rotate-180 left-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-indigo-700 rounded group-hover:-ml-4 group-hover:-mb-4">
                    <span class="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white"></span>
                  </span>
                  <span class="absolute bottom-0 left-0 w-full h-full transition-all duration-500 ease-in-out delay-200 -translate-x-full bg-indigo-600 rounded-md group-hover:translate-x-0"></span>
                  <span class="relative w-full text-center text-white transition-colors duration-200 ease-in-out group-hover:text-white">Login</span>
                </button>
                <Link to="/register" className="text-blue-600 hover:underline">Don't have an account? Register</Link>
              
          </div>
        </div>
      </div>





      </div>
      );
};

      export default Login;
