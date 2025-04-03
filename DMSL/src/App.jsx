import React from "react";
import { Analytics } from "@vercel/analytics/react";
import "./index.css";
import Home from "./routes/Home";
import About from "./routes/About";
import Project from "./routes/Project";
import Contact from "./routes/Contact";
import Team from "./routes/Team";
import AssignmentList from "./routes/AssignmentList";
import FeedbackForm from "./components/FeedbackForm";

import StudentLogin from './components/StudentLogin';
import AdminLogin from './components/AdminLogin'

import Register from "./components/Register";
import Quiz from "./components/quiz.jsx";
import { Routes, Route } from 'react-router-dom';
import AdminDashboard from "./components/adminDashboard/AdminDashboard.jsx";
import StudentDashboard from './components/StudentDashboard';

import ProtectedRoute from "./components/protectedRoute.jsx";
function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/practical/:id" element={<Project />} />
                <Route path="/aboutus" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/team" element={<Team />} />
                <Route path="/assignmentlist" element={<AssignmentList />} />

                <Route path="/login" element={<StudentLogin />} />
                <Route path="/adminlogin" element={<AdminLogin />} />
                 <Route path="/admin/*" element={<ProtectedRoute element={<AdminDashboard />} />} />
                <Route path="/register" element={<Register />} />
                <Route path="/student-dashboard" element={<StudentDashboard />} />
                <Route path="/quiz" element={<Quiz />} />
            </Routes>
            <FeedbackForm />
            <Analytics />
        </>
    );
}

export default App;
