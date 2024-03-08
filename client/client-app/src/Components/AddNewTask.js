import React, { useState } from "react";
import axios from "axios";
import "../style.css";

const AddNewTask = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      console.error("Token missing");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/api/tasks",
        {
          title: title,
          description: description,
          priority: priority,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Task added:", response.data);

      setTitle("");
      setDescription("");
      setPriority("");
      window.location.href = "/home";
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const handleBack = async () => {
    window.location.href = "/home";
  };

  return (
    <div className="container">
      <h2>Add New Task</h2>
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-item">
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-item">
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>
        <div className="form-item">
          <label>Priority:</label>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            required
          >
            <option value="">Select Priority</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
        <div className="button-container">
          <button type="submit">Add Task</button>
          <button className="back" onClick={handleBack}>
            Go back
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddNewTask;
