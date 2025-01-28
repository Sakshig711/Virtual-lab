import React from "react";
import "./index.css";
import Home from "./routes/Home";
import About from "./routes/About";
import Project from "./routes/Project";
import Contact from "./routes/Contact";
import Team from "./routes/Team";
import AssignmentList from "./routes/AssignmentList";
import FeedbackForm from "./components/FeedbackForm";

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
      </Routes>
      <FeedbackForm />
    </>
  );
}

export default App;
