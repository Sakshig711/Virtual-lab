import React, { useState, useEffect } from "react";
import pictlogo from "../assets/pictLogo.png";
import polygon from "../assets/poly4.svg";
import "./css/Nav.css";
import { Link, useNavigate } from "react-router-dom";
import { UserOutlined } from '@ant-design/icons';
import { MenuOutlined, CloseOutlined } from '@ant-design/icons';

const Nav = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const user = JSON.parse(localStorage.getItem('studentData'));
  const navigate = useNavigate();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('studentData');
    localStorage.removeItem('studentToken');
    window.location.reload();
  };

  return (
    <div className="frame">
      <div className="div">
        <div className="nav-bar">
          <div className="overlap-group">
            <img className="pictlogo" alt="Pictlogo" src={pictlogo} />
            <img className="poly" alt="Polygon" src={polygon} />
            <p className="text-wrapper">Pune Institute of Computer Technology</p>
            <p className="subtitle">A Virtual Lab for Database Management System</p>
            {/* Desktop Navigation Links */}
            <div className="nav-links">
              <Link to="/">Home</Link>
              <Link to="/quiz">Quiz</Link>
              <Link to="/assignmentlist">Assignment List</Link>
              
              {!user ? (
                <Link to="/login" className="login-link">Login</Link>
              ) : (
                <Link to="/student-dashboard" className="profile-link">
                  <UserOutlined style={{ marginRight: '8px' }} />
                  Profile
                </Link>
              )}
            </div>

            {/* Mobile Navigation Links */}
            <div className={`nav-links-mobile ${menuOpen ? "active" : ""}`}>
              <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
              <Link to="/quiz" onClick={() => setMenuOpen(false)}>Quiz</Link>
              <Link to="/assignmentlist" onClick={() => setMenuOpen(false)}>Assignment List</Link>
              
              {!user ? (
                <Link to="/login" className="login-link" onClick={() => setMenuOpen(false)}>Login</Link>
              ) : (
                <Link to="/student-dashboard" onClick={() => setMenuOpen(false)}>Profile</Link>
              )}
            </div>
            <button className="menu-icon" onClick={toggleMenu} aria-label="Toggle menu">
  {menuOpen  ? (
    <CloseOutlined style={{ fontSize: '24px', color: '#333' }} />
  ) : (
    <MenuOutlined style={{ fontSize: '24px', color: '#333' }} />
  )}
</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Nav;
