import React, { useEffect, useState } from "react";
import AssignmentListCard from "../components/AssignmentListCard";
import Nav from "../components/Nav";
import bgImage from "../assets/bgimg4.jpeg";

function AssignmentList() {
  const [assignments, setAssignments] = useState([]); // State to store assignments
  const [loading, setLoading] = useState(true); // State for loading status
  const [error, setError] = useState(null); // State for error handling

  useEffect(() => {
    // Fetch data from the API
    fetch("http://localhost:3000/assignmentlist") // Replace with your API endpoint
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch assignments");
        }
        return response.json();
      })
      .then((data) => {
        setAssignments(data.data); // Update state with fetched data
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading assignments...</p>; // Show loading message
  if (error) return <p>Error: {error}</p>; // Show error message

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
      {assignments.length > 0 ? (
        assignments.map((assign) => (
          <AssignmentListCard key={assign.id} id={assign.id} aim={assign.aim} />
        ))
      ) : (
        <p>No assignments available</p>
      )}
    </div>
  );
}

export default AssignmentList;
