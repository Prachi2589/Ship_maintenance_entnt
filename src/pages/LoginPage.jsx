import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import '../styles/login.css';
import logo from '../images/logo.jpg';

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [role, setRole] = useState('Admin');

  useEffect(() => {
    document.title = 'Login | ENTNT Ship Management';
  }, []);

  const validateForm = () => {
    if (!email.trim() || !password.trim()) {
      setErrorMsg('Both fields are required.');
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMsg('Enter a valid email.');
      return false;
    }
    return true;
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const result = login(email, password, role); // Make sure login accepts role too if required

    if (!result.success) {
      setErrorMsg(result.message);
    } else {
      // Store the email and role in localStorage after successful login
      localStorage.setItem('email', email);
      localStorage.setItem('role', role);

      // Redirect to dashboard after successful login
      navigate('/dashboard');
    }
  };

  const handleRoleChange = (newRole) => {
    setRole(newRole);
    setEmail('');
    setPassword('');
    setErrorMsg('');
  };

  return (
    <div className="login-page">
      <div className="top-bar">
        <img src={logo} alt="Logo" className="logo" />
        <span className="project-name">Ship Maintenance Dashboard</span>
      </div>

      <div className="login-box">
        <h2>Login as {role}</h2>

        <div className="role-switch">
          {['Admin', 'Inspector', 'Engineer'].map((r) => (
            <button
              key={r}
              onClick={() => handleRoleChange(r)}
              className={role === r ? 'active-role' : ''}
            >
              {r}
            </button>
          ))}
        </div>

        {errorMsg && <p className="error">{errorMsg}</p>}

        <form onSubmit={handleLogin}>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email"
            className="input-box"
            autoComplete="off"
          />

          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            className="input-box"
            autoComplete="off"
          />

          <button type="submit" className="login-btn">Login</button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
