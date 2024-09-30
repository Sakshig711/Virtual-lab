import React from 'react';
import './Rectangle.css';

const Rectangle = ({ content }) => {
  return (
    <div className="rectangle-container">
      <div className="rectangle-content">
        {content}
      </div>
    </div>
  );
};

export default Rectangle;
