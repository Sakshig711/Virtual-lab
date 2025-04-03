import React from 'react';
import './css/Footer.css';
import { FaHome, FaPhone, FaMailBulk } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-container">
        <div className="footer-left">
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
        </div>
        <div className="divider"></div> {/* Divider Line */}
        <div className="footer-right">
          <div className="footer-section">
            <p>© 2024 IT Dept, PICT | All Rights Reserved</p>
          </div>
          <div className="footer-section links">
            <Link to="/team">Our Team</Link>
            <Link to="/aboutus">About Us</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
