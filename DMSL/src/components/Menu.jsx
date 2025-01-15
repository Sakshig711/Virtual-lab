import React from 'react';
import './css/Menu.css';
import { useLocation } from 'react-router-dom';
const Menu = ({ onMenuClick, activeSection }) => {
  const location = useLocation();
  const { id} = location.state || {};
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
        {/* <a 
          onClick={() => onMenuClick("demo")} 
          className={`btn-1 ${activeSection === "demo" ? "active" : ""}`} 
        >
          Demo
          <svg width="100%" height="100%">
            <rect x="0" y="0" fill="none" width="100%" height="100%" />
          </svg>
        </a> */}
         {![1, 2, 3,4].includes(id) && (
          <a
            onClick={() => onMenuClick("demo")}
            className={`btn-1 ${activeSection === "demo" ? "active" : ""}`}
          >
            Demo
            <svg width="100%" height="100%">
              <rect x="0" y="0" fill="none" width="100%" height="100%" />
            </svg>
          </a>
        )}
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
