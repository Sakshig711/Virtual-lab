import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./Pages/Dashboard";
import Quizzes from "./Pages/Quizzes";
import Students from "./Pages/Students";
import Reports from "./Pages/Reports";
import Sidebar from "./components/Sidebar";
import TopNav from "./components/TopNav";

function AdminDashboard() {
    return (
        <div className="admin-dashboard">
            <Sidebar />
            <div className="main-content">
                <TopNav />
                <div className="page-container">
                    <Routes>
                        <Route path="dashboard" element={<Dashboard />} />
                        <Route path="quizzes" element={<Quizzes />} />
                        <Route path="students" element={<Students />} />
                        <Route path="reports" element={<Reports />} />
                        <Route path="*" element={<Dashboard />} />
                    </Routes>
                </div>
            </div>
        </div>
    );
}

export default AdminDashboard;