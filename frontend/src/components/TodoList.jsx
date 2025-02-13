import React from "react"; 
import { useEffect, useState} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) navigate("/");
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/api/todos", {
        headers: { Authorization: token },
      });
      setTodos(data);
    } catch (error) {
      console.error("Error fetching todos", error);
    }
  };

  const addTodo = async () => {
    if (!newTodo) return;
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/todos",
        { text: newTodo },
        { headers: { Authorization: token } }
      );
      setTodos([...todos, data]);
      setNewTodo("");
    } catch (error) {
      console.error("Error adding todo", error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/todos/${id}`, {
        headers: { Authorization: token },
      });
      setTodos(todos.filter((todo) => todo._id !== id));
    } catch (error) {
      console.error("Error deleting todo", error);
    }
  };

  const toggleComplete = async (id, completed) => {
    try {
      const { data } = await axios.put(
        `http://localhost:5000/api/todos/${id}`,
        { completed: !completed },
        { headers: { Authorization: token } }
      );
      setTodos(todos.map((todo) => (todo._id === id ? data : todo)));
    } catch (error) {
      console.error("Error updating todo", error);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">My To-Do List</h2>
      <div className="flex gap-2 mb-4">
        <input className="w-full p-2 border rounded" type="text" placeholder="Add a new task..." value={newTodo} onChange={(e) => setNewTodo(e.target.value)} />
        <button className="bg-purple-500 text-white p-2 rounded" onClick={addTodo}>Add</button>
      </div>
      <ul className="space-y-2">
        {todos.map((todo) => (
          <li key={todo._id} className="flex justify-between items-center p-2 border rounded">
            <span
              className={`cursor-pointer ${todo.completed ? "line-through text-gray-500" : ""}`}
              onClick={() => toggleComplete(todo._id, todo.completed)}
            >
              {todo.text}
            </span>
            <button className="text-red-500" onClick={() => deleteTodo(todo._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
