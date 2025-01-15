import React, { useEffect, useState } from "react";
import AssignmentListCard from "../components/AssignmentListCard";
import Nav from "../components/Nav";
import axios from "axios";

function AssignmentList() {
    const [assignments, setAssignments] = useState([]); // State to store assignments
    const [loading, setLoading] = useState(true); // State for loading status
    const [error, setError] = useState(null); // State for error handling

    useEffect(() => {
        const fetchAssignments = async () => {
            try {
                const response = await axios.get('https://virtual-lab-server.vercel.app/assignmentlist', {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    withCredentials: true, // Use if the server expects cookies or credentials
                });

                // Log the data and update the assignments state
                console.log(response.data);
                if (response.data && !response.data.error) {
                    setAssignments(response.data.data); // Assuming `data` holds the assignments
                } else {
                    setError(response.data.message || "Failed to load assignments");
                }
            } catch (err) {
                // Handle error and update error state
                console.error("Error fetching assignments:", err.response ? err.response.data : err.message);
                setError(err.response?.data?.message || "Something went wrong");
            } finally {
                setLoading(false); // Stop the loading spinner
            }
        };

        fetchAssignments();
    }, []);

    if (loading) return <p>Loading assignments...</p>; // Show loading message
    if (error) return <p>Error: {error}</p>; // Show error message

    return (
        <>
            <Nav />
            {assignments.length > 0 ? (
                assignments.map((assign) => (
                    <AssignmentListCard key={assign.id} id={assign.id} aim={assign.aim} />
                ))
            ) : (
                <p>No assignments available</p>
            )}
        </>
    );
}

export default AssignmentList;
