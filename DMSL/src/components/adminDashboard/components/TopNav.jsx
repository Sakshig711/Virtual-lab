import React from 'react';
import { FaSearch, FaBell, FaUserCircle } from 'react-icons/fa';
import './TopNav.css';

const TopNav = () => {
  return (
    <nav className="top-nav">
      <div className="search-bar">
        <FaSearch className="search-icon" />
        <input type="search" placeholder="Search students or quizzes..." />
      </div>
      <div className="nav-right">
        <div className="notification">
          <FaBell className="bell-icon" />
          <span className="notification-badge">2</span>
        </div>
        <div className="nav-profile">
          <div className="profile-info">
            <span className="admin-name">Admin Name</span>
            <span className="admin-role">Administrator</span>
          </div>
          <FaUserCircle className="profile-icon" />
        </div>
      </div>
    </nav>
  );
};

export default TopNav;