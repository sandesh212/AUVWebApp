import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import LoginPage from './components/LoginPage';
import HomePage from './components/HomePage';
import CommandWindow from './components/CommandWindow';
import Admin from './components/Admin';
import Graphs from './components/Graphs';
import Images from './components/Images';
import LogFiles from './components/LogFiles';
import './App.css';
// this is App.js
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') === 'true');
  const navigate = useNavigate(); // Correctly define the navigate function

  useEffect(() => {
    // Redirect to login if not logged in and not already on the login page
    if (!isLoggedIn && window.location.pathname !== '/login') {
      navigate('/login', { replace: true });
    }
  }, [isLoggedIn, navigate]);

  const handleLoginSuccess = () => {
    localStorage.setItem('isLoggedIn', 'true');
    setIsLoggedIn(true);
    navigate('/'); // Navigate to home page after successful login
  };

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
    navigate('/login', { replace: true }); // Redirect to login page after logout
  };

  // Define the data for the Footer component 
  const footerData = {
    connectedUnit: "AUV-01",
    currentStatus: "Active",
    missionObjective: "Survey Coral Reefs",
    batteryStatus: "85% Remaining"
  };

  return (
    <div className="App">
      {isLoggedIn ? (
        <>
          <Sidebar onLogout={handleLogout} />
          <div className="main-content">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/LogFiles" element={<LogFiles />} />
              <Route path="/commands" element={<CommandWindow />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/images" element={<Images />} />
              <Route path="/graphs" element={<Graphs />} />
              <Route path="/login" element={<LoginPage onLoginSuccess={handleLoginSuccess} />} />
              <Route path="*" element={<Navigate replace to="/" />} />
            </Routes>
          </div>
          <Footer {...footerData} />
        </>
      ) : (
        <Routes>
          <Route path="/login" element={<LoginPage onLoginSuccess={handleLoginSuccess} />} />
          <Route path="*" element={<Navigate replace to="/login" />} />
        </Routes>
      )}
    </div>
  );
}

export default function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}
