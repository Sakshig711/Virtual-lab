import React, { useState, useEffect } from 'react'; 
import Menu from '../components/Menu.jsx';
import Navbar from '../components/Nav.jsx';
import Rectangle from '../components/Rectangle.jsx'; 
import QuizApp from '../components/Quiz1.jsx';
import VideoGallery from '../components/Video.jsx';

const Project = () => {
  const [content, setContent] = useState("info");
  const [activeSection, setActiveSection] = useState("info");

  const handleMenuClick = (section) => {
    if (section === "try-yourself") {
      window.open("https://www.programiz.com/sql/online-compiler/", "_blank");
    } else {
      setContent(section); 
      setActiveSection(section); 
    }
  };

  useEffect(() => {
    handleMenuClick("info"); // Set "info" as default
  }, []);

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
    } else if (content === "reference") {
      return (
        <Rectangle 
          References={[
            "1) Silberschatz A., Korth H., Sudarshan S., 'Database System Concepts', 6th Edition, McGraw Hill Publishers, ISBN 0-07-120413-X",
            "2) The Complete Reference MySQL - McGraw Hill",
            "3) DBMS Complete Practical Approach - Maheshwari, Jain"
          ]}
        />
      );
    } else if (content === "quiz") {
      return <QuizApp />;  
    } else if (content === "demo") {
      return (
        <div className="section-content">
          <VideoGallery />
        </div>
      );
    } else {
      return <p>Select a section from the menu.</p>;
    }
  };

  return (
    <div>
      <Navbar />
      <Menu onMenuClick={handleMenuClick} activeSection={activeSection} /> 
      {renderContent()}
    </div>
  );
};

export default Project;
