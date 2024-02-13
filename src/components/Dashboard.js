// Dashboard.js
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { generateTestCases } from "../api"; // Adjust the path based on your project structure
import "./Dashboard.css";

function Dashboard({ user, onLogout }) {
  const [formData, setFormData] = useState({
    website: "",
    domain: "",
    testingType: "",
  });
  const [generatedTestCases, setGeneratedTestCases] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { website, domain, testingType, action } = formData;

    try {
      const result = await generateTestCases(website, domain, testingType,action);
      setGeneratedTestCases(result);
    } catch (error) {
      // Handle the error (e.g., show an error message)
      console.error("Error generating test cases:", error);
    }
  };

  const handleRunTests = () => {
    // Add your logic to trigger the Cypress tests
    alert("Running cypress test..."); // For demonstration purposes
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
          <img src={user.avatar} alt="User Avatar" />
        </div>
      </header>

      <form onClick={handleSubmit} className="dashboard-form">
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
        <label>
          Testing Type:
          <input
            type="text"
            name="testingType"
            value={formData.testingType}
            onChange={handleChange}
            className="testing-type"
          />
        </label>
        <input type="hidden" name="action" value={formData.action} />
        <div className="button-container">
      <button type="submit" className="form-button" onClick={() => setFormData({...formData, action: 'generate ui test cases'})}>
      Generate UI Test Cases
      </button>
      <button type="submit" className="form-button" onClick={() => setFormData({...formData, action: 'generate api test cases'})}>
      Generate API Test Cases
      </button>
      <button type="submit" className="form-button" onClick={() => setFormData({...formData, action: 'generate performace test cases'})}>
      Generate Performance Test Cases
      </button>
      <button type="submit" className="form-button" onClick={() => setFormData({...formData, action: 'generate security test cases'})}>
      Generate Security Test Cases
      </button>
     <button type="submit" className="form-button" onClick={() => setFormData({...formData, action: 'generate integration test cases'})}>
     Generate Integration Test Cases
     </button><button type="submit" className="form-button" onClick={() => setFormData({...formData, action: 'generate end-to-end test cases'})}>
     Generate End-To-End Test Cases
     </button>
    </div>
      </form>


      {generatedTestCases && (
        <div className="generated-test-cases">
          <h3>Generated Test Cases:</h3>
          <p>{generatedTestCases}</p>
        </div>
      )}

      <button onClick={handleRunTests} className="run-button">
        Run Cypress Tests
      </button>

      <button onClick={handleLogout} className="logout-button">
        Logout
      </button>
    </div>
  );
}

export default Dashboard;
