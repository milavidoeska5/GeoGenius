import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Auth.css';

function Login() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem('users') || '{}');
    if (!users[email]) {
      setError('No account found for this email. You have to register first.');
      return;
    }
    if (users[email].password !== password) {
      setError('Incorrect password.');
      return;
    }
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userName', users[email].name);
    setError('');
    navigate('/');
  };

  return (
    <div className="auth-container">
      <div className="auth-left">
        <div className="auth-title">
          <span className="auth-dot">●</span> Geography
        </div>
      </div>
      <div className="auth-right">
        <form className="auth-form" onSubmit={handleSubmit}>
          <h2>Login</h2>
          <p className="auth-desc">Please fill your information below</p>
          {error && <div style={{ color: 'red', marginBottom: 8 }}>{error}</div>}
          <label>
            Name
            <div className="auth-input-wrapper">
              <span className="auth-icon">👤</span>
              <input type="text" placeholder="abc" value={name} onChange={e => setName(e.target.value)} />
            </div>
          </label>
          <label>
            Email
            <div className="auth-input-wrapper">
              <span className="auth-icon">📧</span>
              <input type="email" placeholder="abc@gmail.com" value={email} onChange={e => setEmail(e.target.value)} />
            </div>
          </label>
          <label>
            Password
            <div className="auth-input-wrapper">
              <span className="auth-icon">🔒</span>
              <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
            </div>
          </label>
          <button className="auth-btn" type="submit">Next <span className="arrow">→</span></button>
          <div className="auth-divider" />
          <div className="auth-bottom-text">
            Don't have an account? <a href="/signup">Sign up</a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login; 