import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import Menu from '../components/Menu.jsx';
import Navbar from '../components/Nav.jsx';
import Rectangle from '../components/Rectangle.jsx'; 
import QuizApp from '../components/Quiz1.jsx';
import VideoGallery from '../components/Video.jsx';

const Project = () => {
  const [content, setContent] = useState("info");
  const [activeSection, setActiveSection] = useState("info");

  const location = useLocation(); // Access location object
  // const { practicalData } = location.state || {}; // Get practical data from state
  const { id, practicalData } = location.state || {};
  // Check if practicalData exists and is an array
  const practical = practicalData && Array.isArray(practicalData) && practicalData.length > 0 
    ? practicalData[0]  // Access the first element in the array
    : null;

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
      if (!practical) {
        return <p>No practical data available</p>; // Handle missing data gracefully
      }
      return (
        <Rectangle
          Aim={practical.aim || "No Aim available"}
          problemStatement={practical.problemStatement || "No Problem Statement available"}
          Objective={practical.objective || "No Objective available"}
          Conclusion={practical.conclusion || "No Conclusion available"}
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
          {/* <VideoGallery /> */}
          <VideoGallery id={id} />
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
