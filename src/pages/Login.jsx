import React, { useState } from "react";
import api from "../axios";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post("/api/users/login", {
                email, password,
            });
            localStorage.setItem("token", response.data.token);
            alert("Login successful!");
        } catch (error) {
            console.log("Login error: ", error.response?.data || error.message);
            alert("Login failed: ", (error.response?.data?.message || error.message));
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <form
                onSubmit={handleLogin}
                className="bg-white p-6 rounded shadow-md w-full max-w-sm"
            >
                <h2 className="text-2xl font-bold mb-4">Login</h2>

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
                    className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded w-full"
                >
                    Login
                </button>
            </form>
        </div>
    );
}

export default Login;