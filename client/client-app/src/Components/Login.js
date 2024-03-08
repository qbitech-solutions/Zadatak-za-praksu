import React, { useState } from "react";
import axios from "axios";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3000/api/login", {
        username,
        password,
      });

      if (response && response.data) {
        const { token } = response.data;
        localStorage.setItem("token", token);
        console.log("Login successful! Token:", token);
        window.location.href = "/home";
      } else {
        console.error("Invalid response format:", response);
      }
    } catch (error) {
      console.error(
        "Login failed:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const handleGuest = async () => {
    window.location.href = "/signup";
  };

  return (
    <div className="container">
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <label>
          Username
          <input
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Password
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <br />
        <button type="submit">Login</button>
        <button className="button-guest" onClick={handleGuest}>
          Sign up
        </button>
      </form>
    </div>
  );
};

export default Login;
