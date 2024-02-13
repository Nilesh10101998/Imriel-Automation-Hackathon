// SignupPage.js
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./SignupPage.css";

function SignupPage({ onSignup }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [signupStatus, setSignupStatus] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Perform signup logic (you may want to send a request to a server)
    // For simplicity, just sending the signup information to the parent component
    onSignup({ username, password });

    // Set signup status to indicate success
    setSignupStatus("User created successfully!");
  };

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit} className="signup-form">
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
        <button type="submit">Sign Up</button>
      </form>
      {signupStatus && <p className="success-message">{signupStatus}</p>}
      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
}

export default SignupPage;
