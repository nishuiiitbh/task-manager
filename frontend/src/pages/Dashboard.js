import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("medium");
  const [status, setStatus] = useState("todo");
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/tasks", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const createTask = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:5000/api/tasks",
        { title, description, priority, status },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      setTitle("");
      setDescription("");
      fetchTasks();
    } catch (err) {
      console.log(err);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchTasks();
    } catch (err) {
      console.log(err);
    }
  };

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div style={{ maxWidth: "800px", margin: "20px auto", padding: "20px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h2>Welcome, {user.name}! 👋</h2>
        <button
          onClick={logout}
          style={{
            padding: "8px 16px",
            backgroundColor: "#f44336",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Logout
        </button>
      </div>

      <div
        style={{
          backgroundColor: "#f5f5f5",
          padding: "20px",
          borderRadius: "8px",
          marginBottom: "20px",
        }}
      >
        <h3>Create New Task</h3>
        <form onSubmit={createTask}>
          <input
            type="text"
            placeholder="Task Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{
              width: "100%",
              padding: "8px",
              marginBottom: "10px",
              boxSizing: "border-box",
            }}
            required
          />
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={{
              width: "100%",
              padding: "8px",
              marginBottom: "10px",
              boxSizing: "border-box",
              height: "80px",
            }}
          />
          <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              style={{ padding: "8px", flex: 1 }}
            >
              <option value="low">Low Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="high">High Priority</option>
            </select>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              style={{ padding: "8px", flex: 1 }}
            >
              <option value="todo">Todo</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>
          <button
            type="submit"
            style={{
              padding: "10px 20px",
              backgroundColor: "#4CAF50",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Add Task
          </button>
        </form>
      </div>

      <h3>Your Tasks ({tasks.length})</h3>
      {tasks.length === 0 ? (
        <p>No tasks yet. Create one above!</p>
      ) : (
        tasks.map((task) => (
          <div
            key={task._id}
            style={{
              backgroundColor: "white",
              padding: "15px",
              marginBottom: "10px",
              borderRadius: "8px",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
              borderLeft: `4px solid ${task.priority === "high" ? "#f44336" : task.priority === "medium" ? "#FF9800" : "#4CAF50"}`,
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h4 style={{ margin: 0 }}>{task.title}</h4>
              <button
                onClick={() => deleteTask(task._id)}
                style={{
                  padding: "4px 10px",
                  backgroundColor: "#f44336",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                Delete
              </button>
            </div>
            <p style={{ color: "#666", margin: "5px 0" }}>{task.description}</p>
            <span
              style={{
                fontSize: "12px",
                backgroundColor: "#e0e0e0",
                padding: "2px 8px",
                borderRadius: "10px",
              }}
            >
              {task.status}
            </span>
            <span
              style={{
                fontSize: "12px",
                marginLeft: "8px",
                backgroundColor: "#e0e0e0",
                padding: "2px 8px",
                borderRadius: "10px",
              }}
            >
              {task.priority}
            </span>
          </div>
        ))
      )}
    </div>
  );
}

export default Dashboard;
