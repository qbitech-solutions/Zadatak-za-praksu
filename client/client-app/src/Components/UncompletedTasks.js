import React, { useState, useEffect } from "react";
import axios from "axios";

const UncompletedTasks = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchUncompletedTasks = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "http://localhost:3000/api/uncompleted",
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

    fetchUncompletedTasks();
  }, []);

  const handleCompleteTask = async (taskId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:3000/api/tasks/${taskId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));
      window.location.href = "/home";
    } catch (error) {
      console.error("Error completing task:", error);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:3000/api/tasks/${taskId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));
      window.location.href = "/home";
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <>
      {tasks.map((task) => (
        <div key={task._id} className="task-card">
          <p className="title">{task.title}</p>
          <p>{task.description}</p>
          <p className="priority">Priority: {task.priority}</p>
          <button
            className="check"
            onClick={() => handleCompleteTask(task._id)}
          >
            Complete
          </button>
          <button className="delete" onClick={() => handleDeleteTask(task._id)}>
            Delete
          </button>
        </div>
      ))}
    </>
  );
};

export default UncompletedTasks;
