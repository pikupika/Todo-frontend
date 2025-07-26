import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
//import Register from './pages/Register';
//import Home from './pages/Home';

export default function App() {
  const token = localStorage.getItem('token');

  return (
    <Routes>
      <Route path='/' element={token ? <Home /> : <Navigate to='/login'/>} />
      <Route path='/login' element={<Login/>} />
      <Route path='/register' element={<Register />} />
    </Routes>
  )
}