import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

import Menu from "../components/Menu.jsx";
import Navbar from "../components/Nav.jsx";
import Rectangle from "../components/Rectangle.jsx";
import QuizApp from "../components/Quiz1.jsx";
import VideoGallery from "../components/Video.jsx";
import bgImage from "../assets/bgimg5.jpeg"; // Import the image

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
                const resp = await axios.get(
                    `http://localhost:3000/practical/${id}`
                );
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
            {renderContent()}
        </div>
    );
};

export default Project;
