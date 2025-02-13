import { useState} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import React from "react";

function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/auth/signup", {
        username,
        email,
        password,
      });
      console.log("Signup successful:", response.data);
      navigate("/");
    } catch (error) {
      console.error("Signup failed:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Signup failed. Try again.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
        <form onSubmit={handleSignup} className="space-y-4">
          <input className="w-full p-2 border rounded" type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
          <input className="w-full p-2 border rounded" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <input className="w-full p-2 border rounded" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <button className="w-full bg-green-500 text-white p-2 rounded">Sign Up</button>
        </form>
        <p className="mt-2 text-sm">
          Already have an account? <a className="text-blue-500" href="/">Login</a>
        </p>
      </div>
    </div>
  );
}

export default Signup;
