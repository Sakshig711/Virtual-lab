import React, { useState, useEffect } from 'react'; 
import Navbar from '../components/Navbar.jsx';
import Menu from '../components/Menu.jsx';
import HeroImg from '../components/HeroImg.jsx';
import Rectangle from '../components/Rectangle.jsx'; 
//import Project from '../components/Project.css';

const Project = () => {
  const [content, setContent] = useState("info"); 

  const handleMenuClick = (section) => {
    setContent(section); 
  };

  useEffect(() => {
    handleMenuClick("info"); 
  }, []);

  // Define content for each section
  const renderContent = () => {
    if (content === "info") {
      return (
        <Rectangle 
          Aim="Design & Develop DB for 'Order Management System' with all the constraints." 
          problemStatement="Design & Develop DB for 'Order Management System' with all the constraints. (There must be at least 3 entities and relationships between them.) The statement should use SQL objects such as Table, View, Index, and Sequence." 
          Objective="Apply DCL and DDL commands to convert ER/EER diagram to tables. To understand the technique for converting ER diagram into tables. To understand the use of DDL and DCL." 
          Conclusion="Understand how to design and develop a relational database system using MySQL."
        />
      );
    } else {
      switch (content) {
        case "quiz":
          return (
            <div className="section-content">
              <h3>Quiz Section:</h3>
              <p>This is the content for the Quiz section. Add your quiz details or embed questions here.</p>
            </div>
          );
        case "try-yourself":
          return (
            <div className="section-content">
              <h3>Try Yourself Section:</h3>
              <a href="https://www.programiz.com/sql/online-compiler/" target="_blank" rel="noreferrer">
                Click here to try SQL online on Programiz
              </a>
            </div>
          );
        case "reference":
          return (
            <div className="section-content">
              <h3>Reference Section:</h3>
              <p>
                REFERENCE BOOK:.
              </p>
            </div>
          );
        case "demo":
          return (
            <div className="section-content">
              <h3>Demo Section:</h3>
              <p>This is the content for the Demo section. Provide demo-related content here.</p>
            </div>
          );
        default:
          return <p>Select a section from the menu.</p>;
      }
    }
  };

  return (
    <div>
      <Navbar alwaysDark={true} />
      <Menu onMenuClick={handleMenuClick} />
      {renderContent()}
      <HeroImg />
    </div>
  );
};

export default Project;
