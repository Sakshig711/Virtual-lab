import React, { useState, useEffect } from "react";
import pictlogo from "../assets/pictLogo.png";
import polygon from "../assets/poly4.svg";
import "./css/Nav.css";
import { Link, useNavigate } from "react-router-dom";
import { UserOutlined } from '@ant-design/icons';

const Nav = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileOpen && !event.target.closest('.profile-menu')) {
        setProfileOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [profileOpen]);

  const handleProfileClick = (e) => {
    e.stopPropagation();
    setProfileOpen(!profileOpen);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    window.location.reload();
  };

  const handleQuizClick = (e) => {
    e.preventDefault();
    if (!user) {
      navigate('/login');
    } else {
      navigate('/quiz');
    }
  };

  return (
    <div className="frame">
      <div className="div">
        <div className="nav-bar">
          <div className="overlap-group">
            <img className="poly" alt="Polygon" src={polygon} />
            <p className="text-wrapper">Pune Institute Of Computer Technology</p>
            <p className="p">A Virtual Lab for Database Management System</p>
            <img className="pictlogo" alt="Pictlogo" src={pictlogo} />

            {/* Desktop Navigation Links */}
            <div className="nav-links">
              <Link to="/">Home</Link>
              <Link to="/quiz" onClick={handleQuizClick}>Quiz</Link>
              <Link to="/assignmentlist">Assignment List</Link>
              
              {!user ? (
                <Link to="/login" className="login-link">Login</Link>
              ) : (
                <div className="profile-menu" onClick={handleProfileClick}>
                  <div className="profile-circle">
                    <UserOutlined style={{ fontSize: '20px' }} />
                  </div>
                  {profileOpen && (
                    <div className="profile-dropdown">
                      <Link to="/student-dashboard" className="dropdown-item">Dashboard</Link>
                      <button onClick={handleLogout} className="dropdown-item">Logout</button>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Mobile Navigation Links */}
            <div className={`nav-links-mobile ${menuOpen ? "active" : ""}`}>
              <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
              <Link to="/quiz" onClick={handleQuizClick}>Quiz</Link>
              <Link to="/assignmentlist" onClick={() => setMenuOpen(false)}>Assignment List</Link>
              
              {!user ? (
                <Link to="/login" className="login-link" onClick={() => setMenuOpen(false)}>Login</Link>
              ) : (
                <>
                  <Link to="/student-dashboard" onClick={() => setMenuOpen(false)}>Dashboard</Link>
                  <button onClick={handleLogout} className="logout-button">Logout</button>
                </>
              )}
            </div>
            
            <button className="menu-icon" onClick={toggleMenu}>☰</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Nav;
