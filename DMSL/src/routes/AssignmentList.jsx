import React, { useEffect, useState } from "react";
import AssignmentListCard from "../components/AssignmentListCard";
import Nav from "../components/Nav";
import bgImage from "../assets/bgimg4.jpeg";
import axios from "axios";
import Loader from "../components/Loader";
const BASE_URL = import.meta.env.VITE_BASE_URL;

function AssignmentList() {
    const [assignments, setAssignments] = useState([]); // State to store assignments
    const [loading, setLoading] = useState(true); // State for loading status
    const [error, setError] = useState(null); // State for error handling

    useEffect(() => {
        const fetchAssignments = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/assignmentlist`, {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    withCredentials: true, // Use if the server expects cookies or credentials
                });

                // Ensure error is explicitly checked as a string
                if (
                    response.data &&
                    response.data.error === "false" &&
                    Array.isArray(response.data.data)
                ) {
                    setAssignments(response.data.data);
                    setError(null); // Clear any previous errors
                } else {
                    setError(
                        response.data.message || "Invalid data format received."
                    );
                }
            } catch (err) {
                console.error(
                    "Error fetching assignments:",
                    err?.response?.data || err.message
                );
                setError(
                    err?.response?.data?.message ||
                        "Failed to load assignments. Please try again."
                );
            } finally {
                setLoading(false); // Stop the loading spinner
            }
        };

        fetchAssignments();
    }, []);

    // if (loading) return <Loader />; // Show loading message
    if (error) return <p style={{ color: "red" }}>Error: {error}</p>; // Show error message in red

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
                backgroundSize: "10%",
                backgroundAttachment: "fixed",
                justifyContent: "flex-start",
            }}
        >
            <Nav />
            {loading ? (
                <Loader />
            ) : Array.isArray(assignments) && assignments.length > 0 ? (
                assignments.map((assign) => (
                    <AssignmentListCard
                        key={assign.id}
                        id={assign.id}
                        title={assign.title}
                        aim={assign.aim}
                    />
                ))
            ) : (
                <p>No assignments available</p>
            )}
        </div>
    );
}

export default AssignmentList;
