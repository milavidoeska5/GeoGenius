import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const [userName, setUserName] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('isLoggedIn') === 'true') {
      setUserName(localStorage.getItem('userName') || '');
      setIsLoggedIn(true);
    } else {
      setUserName('');
      setIsLoggedIn(false);
    }
  });

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userName');
    setIsLoggedIn(false);
    setUserName('');
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-content">
        <div className="navbar-logo">
          <span role="img" aria-label="logo" className="logo-icon">🎓</span>
          <span className="logo-text">GeoGenius</span>
        </div>
        <ul className="navbar-links">
          <li><Link to="/quiz">Quiz</Link></li>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/flashcards">Flash</Link></li>
          <li><Link to="/chatbot">ChatAI</Link></li>
        </ul>
        <button className="contact-btn">Contact us</button>
        {userName && (
          <div className="navbar-user">
            <span>👤 {userName}</span>
            {isLoggedIn && (
              <button className="logout-btn" onClick={handleLogout}>Log out</button>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar; 