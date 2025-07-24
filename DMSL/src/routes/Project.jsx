import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

import Menu from "../components/Menu.jsx";
import Navbar from "../components/Nav.jsx";
import Rectangle from "../components/Rectangle.jsx";
import QuizApp from "../components/Quiz1.jsx";
import VideoGallery from "../components/Video.jsx";
import bgImage from "../assets/bgimg5.jpeg"; // Import the image

const BASE_URL = import.meta.env.VITE_BASE_URL;

const Project = () => {
    const { id } = useParams();
    const [content, setContent] = useState("info");
    const [activeSection, setActiveSection] = useState("info");
    const [practical, setPractical] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);
    const [factIndex, setFactIndex] = useState(0);

    const funFacts = [
        "Warming up the serverless function. It was a bit chilly.",

        "Asking the database nicely for your data. Please wait.",

        "Looking for your data. We're sure we left it around here somewhere...",

        "Untangling the network cables. Someone must have tripped.",

        "Compressing the data. It's like digital origami.",

        "Reticulating splines... and hoping it sounds impressive enough.",
        "Fact: MongoDB doesn't use tables... because who needs structure anyway?",
        "Relational DBs: because your data *loves* being locked in a relationship.",

        "MySQL: because NoSQL sounds too rebellious.",
        "Did you index that field? No? Good luck with your full table scans.",

        "Yes, the database is slow. No, restarting your laptop won't help.",

        "PostgreSQL is great — until you mistype `DROP` with no `WHERE` clause.",

        "Sharding: because breaking things is fun when it’s intentional.",
    ];
    useEffect(() => {
        let interval;
        if (loading) {
            setFactIndex(() => Math.floor(Math.random() * funFacts.length));

            interval = setInterval(() => {
                setFactIndex(() => Math.floor(Math.random() * funFacts.length));
            }, 6000); // Change fact every 6 seconds
        }

        return () => clearInterval(interval);
    }, [loading]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const resp = await axios.get(`${BASE_URL}/practical/${id}`);
                if (Array.isArray(resp.data) && resp.data.length > 0) {
                    setPractical(resp.data[0]);
                } else {
                    setError("No practical data found for the given ID.");
                }
            } catch (err) {
                setError(
                    "Failed to fetch practical data. Please try again later."
                );
            } finally {
                setLoading(false);
            }
        };
        if (id) fetchData();
    }, [id]);

    const handleMenuClick = (section) => {
        if (section === "try-yourself") {
            if (id == 1) {
                window.open("https://dev.mysql.com/doc/", "_blank");
            } else if (id == 2) {
                window.open(
                    "https://dev.mysql.com/doc/refman/8.0/en/installing.html",
                    "_blank"
                );
            } else if (id == 3) {
                window.open(
                    "https://www.geeksforgeeks.org/difference-between-sql-and-nosql/",
                    "_blank"
                );
            } else {
                window.open(
                    "https://www.programiz.com/sql/online-compiler/",
                    "_blank"
                );
            }
        } else {
            setContent(section);
            setActiveSection(section);
        }
    };

    const renderContent = () => {
        if (loading) return <p>Loading...</p>;
        if (error) return <p>{error}</p>;
        if (!practical) return <p>No practical data available.</p>;

        switch (content) {
            case "info":
                return (
                    <Rectangle
                        title={practical.title || " "}
                        Aim={practical.aim || "No Aim available"}
                        problemStatement={
                            practical.problemStatement ||
                            "No Problem Statement available"
                        }
                        objective={
                            practical.objective || "No Objective available"
                        }
                        Conclusion={
                            practical.conclusion || "No Conclusion available"
                        }
                    />
                );
            case "reference":
                return <Rectangle References={practical.references || []} />;
            case "quiz":
                return <QuizApp id={id} />;
            case "demo":
                return <VideoGallery id={id} />;
            default:
                return <p>Select a section from the menu.</p>;
        }
    };

    return (
        <div
            className="project-wrapper"
            style={{
                position: "relative",
                minHeight: "100vh",
                backgroundImage: `url(${bgImage})`,
                display: "flex",
                flexDirection: "column",
                backgroundRepeat: "repeat",
                backgroundSize: "35%",
                backgroundAttachment: "fixed",
                justifyContent: "flex-start",
            }}
        >
            <Navbar />
            <Menu onMenuClick={handleMenuClick} activeSection={activeSection} />
            <div>
                {loading ? (
                    <div className="loader">
                        <svg viewBox="0 0 100 100" width="80" height="80">
    <ellipse cx="50" cy="30" rx="35" ry="10" fill="#003366" />
    <path d="M15,30 Q50,60 85,30 Q50,0 15,30 Z" fill="none" stroke="#003366" strokeWidth="4">
      <animateTransform attributeName="transform" type="rotate" from="0 50 30" to="360 50 30" dur="2s" repeatCount="indefinite" />
    </path>
  </svg>
                        <h3 className="fact-text">{funFacts[factIndex]}</h3>
                    </div>
                ) : error ? (
                    <p style={{ color: "red", marginTop: "30px" }}>{error}</p>
                ) : (
                    renderContent()
                )}
            </div>
        </div>
    );
};

export default Project;
