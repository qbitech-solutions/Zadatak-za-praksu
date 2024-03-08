import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Components/Login";
import Home from "./Components/Home";
import Signup from "./Components/Signup";
import CompletedTasks from "./Components/CompletedTasks";
import AddNewTask from "./Components/AddNewTask";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" Component={Login} />
        <Route path="/login" Component={Login} />
        <Route path="/home" Component={Home} />
        <Route path="/signup" Component={Signup} />
        <Route path="/completed" Component={CompletedTasks} />
        <Route path="/add" Component={AddNewTask} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
