import { useState } from "react";
import api from "../axios"; // Make sure the path is correct

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/api/users/register", {
        username,
        email,
        password,
      });
      alert("Registered successfully!");
      // Optionally save token or redirect
      localStorage.setItem("token", response.data.token);
    } catch (error) {
      console.error("Registration error:", error.response?.data || error.message);
      alert("Registration failed: " + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleRegister}
        className="bg-white p-6 rounded shadow-md w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold mb-4">Register</h2>

        <label className="block mb-2">
          Username:
          <input
            type="text"
            className="w-full border px-3 py-2 rounded mt-1"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>

        <label className="block mb-2">
          Email:
          <input
            type="email"
            className="w-full border px-3 py-2 rounded mt-1"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>

        <label className="block mb-4">
          Password:
          <input
            type="password"
            className="w-full border px-3 py-2 rounded mt-1"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>

        <button
          type="submit"
          className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded w-full"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
