
import { useState } from "react";
import React from "react"; 
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login({ setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("http://localhost:5000/api/auth/login", { email, password });

      localStorage.setItem("token", data.token); 
      localStorage.setItem("user", JSON.stringify(data.user)); 

      setUser(data.user); 
      navigate("/todos"); 
    } catch (error) {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <input className="w-full p-2 border rounded" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <input className="w-full p-2 border rounded" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <button className="w-full bg-blue-500 text-white p-2 rounded">Login</button>
        </form>
        <p className="mt-2 text-sm">
          Don't have an account? <a className="text-blue-500" href="/signup">Sign Up</a>
        </p>
      </div>
    </div>
  );
}

export default Login;
