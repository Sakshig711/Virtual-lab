import React, { useState, useEffect } from 'react'; 
import Navbar from '../components/Navbar.jsx';
import Menu from '../components/Menu.jsx';
import HeroImg from '../components/HeroImg.jsx';
import Rectangle from '../components/Rectangle.jsx'; 

const Project = () => {
  const [content, setContent] = useState("info"); // Track the active section

  const handleMenuClick = (section) => {
    setContent(section); // Update the content based on the selected section
  };

  useEffect(() => {
    handleMenuClick("info"); // Set "info" as the default section on component mount
  }, []);

  // Define content for each section
  const renderContent = () => {
    if (content === "info") {
      return (
        <>
          <Rectangle 
            Aim="Design & Develop DB for 'Order Management System' with all the constraints." 
            problemStatement="Design & Develop DB for 'Order Management System' with all the constraints. (There must be at least 3 entities and relationships between them.) The statement should use SQL objects such as Table, View, Index, and Sequence." 
            Objective="Apply DCL and DDL commands to convert ER/EER diagram to tables. To understand the technique for converting ER diagram into tables. To understand the use of DDL and DCL." 
            Conclusion="Understand how to design and develop a relational database system using MySQL."
          />
        </>
      );
    } else {
      switch (content) {
        case "quiz":
          return (
            <>
              <h3>Quiz Section:</h3>
              <p>This is the content for the Quiz section. Add your quiz details or embed questions here.</p>
            </>
          );
        case "try-yourself":
          return (
            <>
              <h3>Try Yourself Section:</h3>
              <p>This is the content for the Try Yourself section. Add interactive exercises or code challenges here.</p>
            </>
          );
        case "reference":
          return (
            <>
              <h3>Reference Section:</h3>
              <p>This is the content for the Reference section. Provide references, links, or additional reading material here.</p>
            </>
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
      {content === "info" ? (
        renderContent()
      ) : (
        <Rectangle>
          {renderContent()}
        </Rectangle>
      )}
      <HeroImg />
    </div>
  );
};

export default Project;
