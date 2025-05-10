import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Auth.css';

function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem('users') || '{}');
    if (users[email]) {
      setError('An account with this email already exists.');
      return;
    }
    users[email] = { name, password };
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userName', name);
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
          <h2>Sign Up</h2>
          <p className="auth-desc">Create your account</p>
          {error && <div style={{ color: 'red', marginBottom: 8 }}>{error}</div>}
          <label>
            Name
            <div className="auth-input-wrapper">
              <span className="auth-icon">👤</span>
              <input type="text" placeholder="abc" value={name} onChange={e => setName(e.target.value)} required />
            </div>
          </label>
          <label>
            Email
            <div className="auth-input-wrapper">
              <span className="auth-icon">📧</span>
              <input type="email" placeholder="abc@gmail.com" value={email} onChange={e => setEmail(e.target.value)} required />
            </div>
          </label>
          <label>
            Password
            <div className="auth-input-wrapper">
              <span className="auth-icon">🔒</span>
              <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
            </div>
          </label>
          <button className="auth-btn" type="submit">Sign Up</button>
          <div className="auth-divider" />
          <div className="auth-bottom-text">
            Already have an account? <a href="/login">Login</a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup; 