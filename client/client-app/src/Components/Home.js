import React from "react";
import Sidebar from "./SIdebar";
import UncompletedTasks from "./UncompletedTasks";

const Home = () => {
  return (
    <div className="main-container">
      <div className="content">
        <Sidebar />
        <UncompletedTasks />
      </div>
    </div>
  );
};

export default Home;
