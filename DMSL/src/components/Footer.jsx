import React, { useEffect } from 'react';
import './Footer.css';
import { FaHome, FaMailBulk, FaPhone } from 'react-icons/fa';

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-container">
        <div className="left">
          <div className="location">
            <FaHome size={20} style={{ color: '#fff', marginRight: '2rem' }} />
            <div>
              <p>Pune Institute Of Computer Technology</p>
              <p>Survey No. 27, Near Trimurti Chowk Dhankwadi, Pune - 411043</p>
            </div>
          </div>
          <div className="phone">
            <FaPhone size={20} style={{ color: '#fff', marginRight: '2rem', rotate: '90deg' }} />
            <p>+91 20 24371101</p>
          </div>
          <div className="email">
            <FaMailBulk size={20} style={{ color: '#fff', marginRight: '2rem' }} />
            <p>registrar@pict.edu</p>
          </div>
        </div>
      </div>
      <div className="right">
          <p>Copyright © 2024 IT Dept, PICT, All Rights Reserved. | Developed By <a href="https://www.google.com" target="_blank" rel="noreferrer">DMSL team</a></p>
        </div>
    </div>
  );
};

export default Footer;
