import React from "react";
import TeamCard from "../components/Card.jsx";
import "./css/About.css";
import Jakhete from "../assets/Jakhete.jpg";
import Hiray from "../assets/hiray.jpg";
import hod from "../assets/hod.jpg"
const mentors = [
    {
    name: "Dr.Emmanuel Mark",
    role: "Professor & Head, IT Dept.",
    location: "PICT, Pune, India",
    email: "hodit@pict.edu",
    imageUrl: hod,
    linkedinUrl: "https://www.linkedin.com/in/dr-emmanuel-mark-568a4316/",
  },
  {
    name: "Sumitra A. Jakhete",
    role: "Associate Professor, IT Dept.",
    location: "PICT, Pune, India",
    email: "sajakhete@pict.edu",
    imageUrl: Jakhete,
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
];

const AboutMentors = () => {
  return (
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
  );
};

export default AboutMentors;
