import React from 'react';
import { useNavigate } from 'react-router-dom';
import './css/LoginPage.css';

function LoginPage({ onLoginSuccess }) {
  const navigate = useNavigate();

  const handleLogin = () => {
    onLoginSuccess();  // This should confirm the login was successful
    navigate('/');     // Navigate to the Home page which is at the root
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={(e) => e.preventDefault()}>
        <h2>Login</h2>
        <input type="text" placeholder="Username or Email" />
        <input type="password" placeholder="Password" />
        <button onClick={handleLogin} type="button">Log In</button>
      </form>
    </div>
  );
}

export default LoginPage;
