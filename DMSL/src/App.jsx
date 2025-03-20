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
import Login from "./components/login";
import Register from "./components/Register";
import Quiz from "./components/exam";
import { Route, Routes } from "react-router-dom";

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
                <Route path="/admin" element={<Login></Login>}/>
                <Route path="/register" element={<Register></Register>}></Route>
                <Route path="/exam" element={<Quiz></Quiz>}></Route>
            </Routes>
            <FeedbackForm />
            <Analytics />
        </>
    );
}

export default App;
