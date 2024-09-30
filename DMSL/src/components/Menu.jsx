import React from 'react';
import './Menu.css';

const Menu = ({ onMenuClick }) => {
  return (
    <div className="menu-container">
      <nav className="menu-items">
        <a onClick={() => onMenuClick("info")}>Info</a>
        <a onClick={() => onMenuClick("demo")}>Demo</a>
        <a onClick={() => onMenuClick("try-yourself")}>Try Yourself</a>
        <a onClick={() => onMenuClick("quiz")}>Quiz</a>
        <a onClick={() => onMenuClick("reference")}>Reference</a>
      </nav>
    </div>
  );
};

export default Menu;
