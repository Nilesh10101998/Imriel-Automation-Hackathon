// Dashboard.js
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { generateTestCases } from "../api"; // Adjust the path based on your project structure
import "./Dashboard.css";
import { getUserCredentials } from "./shared-resources";
import "slick-carousel/slick/slick.css"; // These imports are correct
import "slick-carousel/slick/slick-theme.css";

function Dashboard({ user, onLogout }) {
  const userName = getUserCredentials();
  const [formData, setFormData] = useState({
    website: "",
    domain: "",
  });
  const [generatedTestCases, setGeneratedTestCases] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    const { website, domain, action } = formData;

    try {
      const result = await generateTestCases(website, domain, action);
      setGeneratedTestCases(result);
    } catch (error) {
      // Handle the error (e.g., show an error message)
      console.error("Error generating test cases:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    onLogout();
    navigate("/login");
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h2 className="dashboard-title">Welcome, {user.username}!</h2>
        <div className="user-avatar">
          <span className="user-info"><b>Welcome, {userName}</b></span>
          <span><img src={user.avatar} alt="User Avatar" /></span>
        </div>
      </header>
      
      <form onSubmit={handleSubmit} className="dashboard-form">
        <label>
          Website:
          <input
            type="text"
            name="website"
            value={formData.website}
            onChange={handleChange}
            className="input-fields"
          />
        </label>
        
        <label>
          Domain:
          <input
            type="text"
            name="domain"
            value={formData.domain}
            onChange={handleChange}
            className="input-fields"
          />
        </label>
        
        <input type="hidden" name="action" value={formData.action} />
        <div className="button-container">
          <button className="form-button" onClick={() => setFormData({...formData, action: 'generate ui test cases'})}>
            Generate UI Test Cases
          </button>
          <button className="form-button" onClick={() => setFormData({...formData, action: 'generate api test cases'})}>
            Generate API Test Cases
          </button>
          <button className="form-button" onClick={() => setFormData({...formData, action: 'generate performace test cases'})}>
            Generate Performance Test Cases
          </button>
          <button className="form-button" onClick={() => setFormData({...formData, action: 'generate security test cases'})}>
            Generate Security Test Cases
          </button>
          <button className="form-button" onClick={() => setFormData({...formData, action: 'generate integration test cases'})}>
            Generate Integration Test Cases
          </button>
          <button className="form-button" onClick={() => setFormData({...formData, action: 'generate end-to-end test cases'})}>
            Generate End-To-End Test Cases
          </button>
        </div>
      </form>

      {loading && <div className="loader">Loading</div>}

      {generatedTestCases && (
        <div className="generated-test-cases">
          <h3>Generated Test Cases:</h3>
          <p>{generatedTestCases}</p>
        </div>
      )}

      <button onClick={handleLogout} className="logout-button">
        Logout
      </button>
    </div>
  );
}

export default Dashboard;
