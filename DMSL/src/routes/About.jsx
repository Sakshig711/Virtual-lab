import React from "react";
import Navbar from "../components/Nav.jsx";
import TeamCard from "../components/Card.jsx";
import "./css/About.css";
import Hod from "../assets/hod.jpg";
import Jakate from "../assets/Jakhete.jpg";
import Hiray from "../assets/hiray.jpg";
import Archana from "../assets/Archana_Kadam.jpg";

const mentors = [
  {
    name: "Dr. Archana S. Ghotkar",
    role: "Associate Professor & Head, IT Dept.",
    location: "PICT, Pune, India",
    email: "aagtokar@pict.edu",
    imageUrl: Hod,
    linkedinUrl: "https://www.linkedin.com/in/archana-ghotkar/",
  },
  {
    name: "Sumitra A. Jakhete",
    role: "Associate Professor, IT Dept.",
    location: "PICT, Pune, India",
    email: "sajakhete@pict.edu",
    imageUrl: Jakate,
    linkedinUrl: "https://www.linkedin.com/in/sumitra-jakhete/",
  },
  {
    name: "Swapnaja R. Hiray",
    role: "Associate Professor, IT Dept.",
    location: "PICT, Pune, India",
    email: "srhiray@pict.edu",
    imageUrl: Hiray,
    linkedinUrl: "https://www.linkedin.com/in/swapnaja-hiray/",
  },
  {
    name: "Archana S. Kadam",
    role: "Associate Professor, IT Dept.",
    location: "PICT, Pune, India",
    email: "askadam@pict.edu",
    imageUrl: Archana,
    linkedinUrl: "https://www.linkedin.com/in/archana-kadam/",
  },
];

const AboutMentors = () => {
  return (
    <div>
      <Navbar alwaysDark />
      <section className="about-page">
        <h1 className="heading">Our Mentors</h1>
        <p className="team-description">
          We express our gratitude to the esteemed mentors who provided us with 
          invaluable guidance, content, and ideas to shape this project.
        </p>
        <div className="about-cards">
          {mentors.map((mentor, index) => (
            <TeamCard
              key={index}
              name={mentor.name}
              role={mentor.role}
              description={`${mentor.location} | ${mentor.email}`}
              imageUrl={mentor.imageUrl}
              linkedinUrl={mentor.linkedinUrl}
              showGithub={false} 
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default AboutMentors;
