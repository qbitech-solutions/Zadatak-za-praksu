import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "./SIdebar";
const CompletedTasks = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchCompletedTasks = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "http://localhost:3000/api/completed",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setTasks(response.data);
      } catch (error) {
        console.error("Error fetching uncompleted tasks:", error);
      }
    };

    fetchCompletedTasks();
  }, []);

  const handleDeleteTask = async (taskId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:3000/api/tasks/${taskId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));
      window.location.href = "/completed";
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <div className="main-container">
      <div className="content">
        <Sidebar />
        <>
          {tasks.map((task) => (
            <div key={task._id} className="task-card">
              <p className="title">{task.title}</p>
              <p>{task.description}</p>
              <p className="priority">Priority: {task.priority}</p>
              <button className="checked">Completed</button>
              <button
                className="delete"
                onClick={() => handleDeleteTask(task._id)}
              >
                Delete
              </button>
            </div>
          ))}
        </>
      </div>
    </div>
  );
};

export default CompletedTasks;
