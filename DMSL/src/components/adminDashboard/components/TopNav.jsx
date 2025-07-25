import React, { useState, useEffect } from "react";
import { FaSearch, FaBell, FaUserCircle } from "react-icons/fa";
import { Modal, List, Tag } from "antd";
import "./TopNav.css";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL;
const TopNav = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [username, setUsername] = useState("Admin");
    // const [weakStudents] = useState([
    //   { id: 1, name: 'John Smith', rollNo: '101', marks: 45, subject: 'Database Basics' },
    //   { id: 2, name: 'Emily Brown', rollNo: '105', marks: 35, subject: 'SQL Queries' },
    //   { id: 3, name: 'Mike Wilson', rollNo: '108', marks: 42, subject: 'DBMS Architecture' },
    // ]);
    const [weakStudents, setWeakStudents] = useState([]);

    useEffect(() => {
        const fetchStudentData = async () => {
            try {
                const response = await axios.get(
                    `${BASE_URL}/api/student-performance`
                );
                const data = response.data;
                console.log("student data", data);
                // Filter and format weak students
                // const filtered = data
                //   .filter(student => student.marks < 50) // Filter weak students
                //   .map(student => ({
                //     id: student.key,
                //     name: student.name,
                //     rollNo: student.rollNo,
                //     marks: student.marks,
                //     subject: student.assignments.length > 0 ? student.assignments[0].name : 'N/A'
                //   }));

                const filtered = data
                    .filter(
                        (student) =>
                            student.category === "Category C" &&
                            student.marks < 50
                    )
                    .map((student) => ({
                        id: student.key,
                        name: student.name,
                        rollNo: student.rollNo,
                        marks: student.marks,
                        subject:
                            student.assignments.length > 0
                                ? student.assignments[0].name
                                : "N/A",
                    }))
                    .slice(0, 3);

                setWeakStudents(filtered);
            } catch (error) {
                console.error("Error fetching student data:", error);
            }
        };

        fetchStudentData();
    }, []);
    useEffect(() => {
        // Retrieve token from localStorage
        const token = localStorage.getItem("token");

        if (token) {
            try {
                const decoded = jwtDecode(token);
                setUsername(decoded.name || "Unknown"); // Extract username from decoded token
            } catch (error) {
                console.error("Error decoding token:", error);
            }
        }
    }, []);
    const handleNotificationClick = () => {
        setIsModalVisible(true);
    };

    return (
        <nav className="top-nav">
            <div className="search-bar">
                <FaSearch className="search-icon" />
                <input
                    type="search"
                    placeholder="Search students or quizzes..."
                />
            </div>
            <div className="nav-right">
                <div className="notification" onClick={handleNotificationClick}>
                    <FaBell className="bell-icon" />
                    <span className="notification-badge">
                        {weakStudents.length}
                    </span>
                </div>
                <div className="nav-profile">
                    <div className="profile-info">
                        <span className="admin-name">{username}</span>
                        <span className="admin-role">Administrator</span>
                    </div>
                    <FaUserCircle className="profile-icon" />
                </div>
            </div>

            <Modal
                title="Low Performance Alerts"
                visible={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
                footer={null}
            >
                <List
                    dataSource={weakStudents}
                    renderItem={(student) => (
                        <List.Item>
                            <List.Item.Meta
                                title={`${student.name} (Roll No: ${student.rollNo})`}
                                description={`Exam: ${student.subject}`}
                            />
                            <Tag color="red">{student.marks}%</Tag>
                        </List.Item>
                    )}
                />
            </Modal>
        </nav>
    );
};

export default TopNav;
