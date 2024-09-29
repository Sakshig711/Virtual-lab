import React from 'react';
import './Menu.css';

const Menu = () => {
  return (
    <div className="menu-container">
      <nav className="menu-items">
        <a href="#info">Info</a>
        <a href="#quiz">Quiz</a>
        <a href="#try-yourself">Try Yourself</a>
        <a href="#reference">Reference</a>
      </nav>
    </div>
  );
};

export default Menu;
