// LoginPage.js
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./LoginPage.css";
import{setUserCredentials} from "./shared-resources";

function LoginPage({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // Sample authenticated credentials
 

  const loginCredentials=[
     {
      userName: "Nilesh",
      password: "Nilesh@123"
     },
     {
      userName: "Shailesh",
      password: "Shailesh@123"
     },
     {
      userName: "Krushna",
      password: "Krushna@123"
     }
    ]


  const handleSubmit = (e) => {
    e.preventDefault();
    let authorisedUser=false;

    loginCredentials.forEach(element => {
      if(element.userName===username && element.password===password){
        authorisedUser=true;
      }
    });

    

    // Simple authentication check
    if (authorisedUser) {
      setUserCredentials(username, password);
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

