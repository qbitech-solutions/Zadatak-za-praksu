import React from "react";
import { Link } from "react-router-dom";

const Logout = ({ onLogout }) => {
  const handleLogout = () => {
    localStorage.removeItem("token");

    window.location.href = "/";
  };

  return (
    <Link to="/logout" onClick={handleLogout}>
      Sign out
    </Link>
  );
};

export default Logout;
