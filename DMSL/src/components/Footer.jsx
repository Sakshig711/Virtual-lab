import React from 'react';
import './Footer.css';
import { FaHome, FaPhone, FaMailBulk } from 'react-icons/fa';

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-container">
        <div className="footer-section location">
          <FaHome size={16} style={{ color: '#fff', marginRight: '0.5rem' }} />
          <p>Pune Institute Of Computer Technology</p>
        </div>
        <div className="footer-section contact">
          <FaPhone size={16} style={{ color: '#fff', marginRight: '0.5rem' }} />
          <p>+91 20 24371101</p>
        </div>
        <div className="footer-section email">
          <FaMailBulk size={16} style={{ color: '#fff', marginRight: '0.5rem' }} />
          <p>registrar@pict.edu</p>
        </div>
        <div className="footer-section">
          <p>© 2024 IT Dept, PICT | All Rights Reserved</p>
          <p>Developed By <a href="https://www.google.com" target="_blank" rel="noreferrer">DMSL team</a></p>
        </div>
        <div className="footer-section links">
          <a href="#privacy">Privacy Policy</a> | <a href="#terms">Terms of Services</a> | <a href="#contact">Contact</a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
