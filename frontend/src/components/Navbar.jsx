

import { useNavigate } from "react-router-dom";
import React from "react";

function Navbar({ user, setUser }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user"); 
    setUser(null);
    navigate("/");
  };

  return (
    <nav className="bg-purple-500 p-4 flex justify-between items-center">
      <h1 className="text-white text-xl font-bold">To-Do App</h1>
      <div className="flex items-center gap-4">
        {user ? (
          <>
            <span className="text-white font-medium">
              {user.username || user.email} {/* Display username or email */}
            </span>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Logout
            </button>
          </>
        ) : (
          <button
            onClick={() => navigate("/")}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Login
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
