import React from 'react';
import { FaInstagram, FaLinkedin, FaHome, FaBook, FaEnvelope, FaUser, FaGithub } from 'react-icons/fa'; // Importing icons from react-icons library
import './Footer.css'; // Importing the Footer styles

// Footer component to display information about the store and provide quick links and social media links
const Footer = () => {
  return (
    <footer>
      {/* About section with a brief description */}
      <div>
        <h3>About Us</h3>
        <p>Learn more about our store and mission to provide the best eBooks.</p>
      </div>
      
      {/* Container for footer sections */}
      <div className="footer-container">
        
        {/* Quick Links section with links to main pages of the app */}
        <div className="footer-section divider">
          <h3>Quick Links</h3>
          <ul>
            {/* Each link contains an icon from react-icons for a visual cue */}
            <li><a href="/"><FaHome /> Home</a></li>
            <li><a href="/categories"><FaBook /> Categories</a></li>
            <li><a href="/contact"><FaEnvelope /> Contact</a></li>
            <li><a href="/account"><FaUser /> Account</a></li>
          </ul>
        </div>
        
        {/* Social Media Links section */}
        <div className="footer-section">
          <h3>Follow Us</h3>
          <ul className="social-links">
            {/* Each list item links to a social media profile and opens in a new tab */}
            <li><a href="https://instagram.com/vj_vigneswaran?igsh=N25sZDNjZWQxZGcx" target="_blank" rel="noopener noreferrer"><FaInstagram /></a></li>
            <li><a href="https://github.com/VJVigneswaran/" target="_blank" rel="noopener noreferrer"><FaGithub /></a></li>
            <li><a href="https://www.linkedin.com/in/vigneswaran-s-779ba92a0/" target="_blank" rel="noopener noreferrer"><FaLinkedin /></a></li>
            <li><a href="mailto:vigneswaranvalarmathy@gmail.com"><FaEnvelope /></a></li>
          </ul>
        </div>
      </div>
      
      {/* Copyright notice */}
      <p>&copy; 2024 E-Book Store. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
