// LoginPage.js
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./LoginPage.css";

function LoginPage({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // Sample authenticated credentials
  const AUTHENTICATED_USER = "Nilesh";
  const AUTHENTICATED_PASS = "Nilesh@123";

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simple authentication check
    if (username === AUTHENTICATED_USER && password === AUTHENTICATED_PASS) {
      // Assuming onLogin updates some global state to reflect authentication status
      onLogin({ username, password });

      // Navigate to the dashboard
      navigate("/dashboard");
    } else {
      // Inform user of incorrect credentials
      alert("Incorrect username or password!");
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button type="submit">Login</button>
      </form>
      <p>
        Don't have an account? <Link to="/signup">Sign Up</Link>
      </p>
    </div>
  );
}

export default LoginPage;

