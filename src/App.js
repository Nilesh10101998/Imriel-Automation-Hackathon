// App.js
import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LoginPage from "./components/LoginPage";
import Dashboard from "./components/Dashboard";
import SignupPage from "./components/SignupPage"; // Import the SignupPage component
import NotFound from "./components/NotFound";
import "./App.css";

function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [users, setUsers] = useState([]);

  const handleLogin = () => {
    setAuthenticated(true);
  };

  const handleLogout = () => {
    setAuthenticated(false);
  };

  const handleSignup = (userData) => {
    // Add the new user to the list of users
    setUsers([...users, userData]);
  };

  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route
            path="/login"
            element={
              <LoginPage authenticated={authenticated} onLogin={handleLogin} />
            }
          />
          <Route
            path="/dashboard"
            element={
              authenticated ? (
                <Dashboard
                  user={{
                    username: "IMRIEL",
                    avatar: "https://i.pravatar.cc/300",
                  }}
                  onLogout={handleLogout}
                />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/signup"
            element={<SignupPage onSignup={handleSignup} />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
