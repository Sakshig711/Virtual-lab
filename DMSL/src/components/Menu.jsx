import React from 'react';
import './Menu.css';

const Menu = ({ onMenuClick, activeSection }) => {
  return (
    <div className="menu-container">
      <nav className="menu-items">
        <a 
          onClick={() => onMenuClick("info")} 
          className={`btn-1 ${activeSection === "info" ? "active" : ""}`} 
        >
          Info
          <svg width="100%" height="100%">
            <rect x="0" y="0" fill="none" width="100%" height="100%" />
          </svg>
        </a>
        <a 
          onClick={() => onMenuClick("demo")} 
          className={`btn-1 ${activeSection === "demo" ? "active" : ""}`} 
        >
          Demo
          <svg width="100%" height="100%">
            <rect x="0" y="0" fill="none" width="100%" height="100%" />
          </svg>
        </a>
        <a 
          onClick={() => onMenuClick("quiz")} 
          className={`btn-1 ${activeSection === "quiz" ? "active" : ""}`} 
        >
          Quiz
          <svg width="100%" height="100%">
            <rect x="0" y="0" fill="none" width="100%" height="100%" />
          </svg>
        </a>
        <a 
          onClick={() => onMenuClick("try-yourself")} 
          className={`btn-1 ${activeSection === "try-yourself" ? "active" : ""}`} 
        >
          Try Yourself
          <svg width="100%" height="100%">
            <rect x="0" y="0" fill="none" width="100%" height="100%" />
          </svg>
        </a>
        <a 
          onClick={() => onMenuClick("reference")} 
          className={`btn-1 ${activeSection === "reference" ? "active" : ""}`} 
        >
          Reference
          <svg width="100%" height="100%">
            <rect x="0" y="0" fill="none" width="100%" height="100%" />
          </svg>
        </a>
      </nav>
    </div>
  );
};

export default Menu;
