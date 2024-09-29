import "./HeroImg.css";
import React from 'react';
import bgimg from '../assets/pict building.jpg';

const HeroImg = ({ children }) => {
  return (
    <div className="hero">
      <div className="mask">
        <img className="into-img" src={bgimg} alt="background img" />
        {/* Add a container for the content */}
        <div className="content-container">
          {children}
        </div>
      </div>
    </div>
  );
};

export default HeroImg;
