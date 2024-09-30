import React, { useState, useEffect } from 'react'; 
import Navbar from '../components/Navbar.jsx';
import Menu from '../components/Menu.jsx';
import HeroImg from '../components/HeroImg.jsx';
import Footer from '../components/Footer.jsx';
import Rectangle from '../components/Rectangle.jsx'; 

const Project = () => {
  const [content, setContent] = useState("This is the Info section."); 

  const handleMenuClick = (section) => {
    switch (section) {
      case "info":
        setContent("This is the Info section.");
        break;
      case "quiz":
        setContent("This is the Quiz section.");
        break;
      case "try-yourself":
        setContent("This is the Try Yourself section.");
        break;
      case "reference":
        setContent("This is the Reference section.");
        break;
      default:
        setContent("This is the Info section.");
    }
  };

  useEffect(() => {
    handleMenuClick("info"); 
  }, []);

  return (
    <div>
      <Navbar alwaysDark={true} />
      <Menu onMenuClick={handleMenuClick} /> 
      <Rectangle content={content} /> 
      <HeroImg />
      <Footer />
    </div>
  );
};

export default Project;
