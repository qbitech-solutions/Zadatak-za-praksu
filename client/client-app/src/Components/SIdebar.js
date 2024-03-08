import React from "react";
import { Link } from "react-router-dom";
import "../style.css";
import Logout from "./SignOut";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="top-sidebar">
        <h2>Todo App</h2>
        <ul>
          <li>
            <Link to="/home">Home</Link>
          </li>
          <li>
            <Link to="/add">Add</Link>
          </li>
          <li>
            <Link to="/completed">Completed</Link>
          </li>
        </ul>
      </div>
      <div className="bottom-sidebar">
        <ul>
          <li>
            <Logout />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
