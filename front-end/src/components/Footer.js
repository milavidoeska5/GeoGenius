import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-col footer-brand-col">
          <div className="footer-logo-row">
            <span role="img" aria-label="logo" className="footer-logo">🎓</span>
            <span className="footer-brand">GeoGenius</span>
          </div>
        </div>
        <div className="footer-col">
          <h4>Follow us</h4>
          <div className="footer-social">
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-twitter"></i></a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-linkedin"></i></a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram"></i></a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-facebook"></i></a>
          </div>
        </div>
        <div className="footer-col">
          <h4>Useful Links</h4>
          <ul>
            <li>Our Projects</li>
            <li>FAQ's</li>
            <li>News and Updates</li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>Contacts</h4>
          <p>Address : 4-5 Main road , Delhi</p>
          <p>Email : geogenius@gmail.com</p>
          <p>Phone Number : +91 4533433265</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer; 