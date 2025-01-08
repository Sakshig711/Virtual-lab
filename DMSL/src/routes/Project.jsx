import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

import Menu from '../components/Menu.jsx';
import Navbar from '../components/Nav.jsx';
import Rectangle from '../components/Rectangle.jsx'; 
import QuizApp from '../components/Quiz1.jsx';
import VideoGallery from '../components/Video.jsx';

const Project = () => {
  const { id } = useParams();
  const [content, setContent] = useState("info");
  const [activeSection, setActiveSection] = useState("info");
  const [practical, setPractical] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resp = await axios.get(`https://virtual-lab-server.vercel.app/practical/${id}`);
        if(Array.isArray(resp.data) && resp.data.length > 0){
          setPractical(resp.data[0]);
        }else {
          setError("No practical data found for the given ID.");
        }
      } catch (err) {
        setError("Failed to fetch practical data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchData();
  }, [id]);

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
    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;
    if (!practical) return <p>No practical data available.</p>;

    switch (content) {
      case "info":
        return (
          <Rectangle
            Aim={practical.aim || "No Aim available"}
            problemStatement={practical.problemStatement || "No Problem Statement available"}
            Objective={practical.objective || "No Objective available"}
            Conclusion={practical.conclusion || "No Conclusion available"}
          />
        );
      case "reference":
        return (
          <Rectangle
            References={[
              "1) Silberschatz A., Korth H., Sudarshan S., 'Database System Concepts', 6th Edition, McGraw Hill Publishers, ISBN 0-07-120413-X",
              "2) The Complete Reference MySQL - McGraw Hill",
              "3) DBMS Complete Practical Approach - Maheshwari, Jain",
            ]}
          />
        );
      case "quiz":
        return <QuizApp />;
      case "demo":
        return <VideoGallery id={id} />;
      default:
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
