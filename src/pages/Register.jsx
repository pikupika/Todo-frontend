import { useState } from "react";
import { registerUser } from "../api/auth";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await registerUser(formData);
      navigate("/login");
    } catch {
      alert("Register failed");
    }
  };

  return (
    <form onSubmit={handleRegister} className="p-4">
      <h2 className="text-xl mb-2">Register</h2>
      <input type="text" placeholder="Username" value={formData.username} onChange={(e) => setFormData({...formData, username: e.target.value})} className="border p-2 mb-2 w-full" />
      <input type="email" placeholder="Email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="border p-2 mb-2 w-full" />
      <input type="password" placeholder="Password" value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} className="border p-2 mb-2 w-full" />
      <button type="submit" className="bg-green-500 text-white px-4 py-2">Register</button>
    </form>
  );
}
