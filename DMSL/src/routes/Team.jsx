import React, { useEffect } from "react";
import Navbar from "../components/Nav.jsx";
import TeamCard from "../components/Card";
import "./css/Team.css";
import Atharva from "../assets/atharva.png";
import Kshitij from "../assets/Kshitij.png";
import Shlok from "../assets/Shlok.jpg";
import Sakshi from "../assets/sakshi.jpeg";
import Satvik from "../assets/satvik.jpeg";

const teamMembers = [
  {
    name: "Atharva Dhake",
    role: "Fullstack Developer",
    description: "Designed and developed the UI.",
    imageUrl: Atharva,
    linkedinUrl: "https://www.linkedin.com/in/atharva-dhake-155160258/",
    githubUrl: "https://github.com/atharva-dhake",
    mailUrl: "atharvadhake01@gmail.com",
  },
  {
    name: "Kshitij Dhake",
    role: "Fullstack Developer",
    description: "Built backend APIs and integrated them with the UI.",
    imageUrl: Kshitij,
    linkedinUrl: "https://www.linkedin.com/in/kshitijdhake/",
    githubUrl: "https://github.com/ksdhake28",
    mailUrl: "kdhake289@gmail.com",
  },
  {
    name: "Sakshi Gangurde",
    role: "Fullstack Developer",
    description: "Designed and developed the UI.",
    imageUrl: Sakshi,
    linkedinUrl: "https://www.linkedin.com/in/sakshi-s-gangurde/",
    githubUrl: "https://github.com/sakshig711",
    mailUrl: "gangurdesakshi711@gmail.com",
  },
  {
    name: "Shlok Gaidhani",
    role: "Fullstack Developer",
    description: "Designed and developed the UI.",
    imageUrl: Shlok,
    linkedinUrl: "https://www.linkedin.com/in/shlok-gaidhani-57135629a/",
    githubUrl: "https://github.com/Shlok-06",
    mailUrl: "gaidhanishlok2004@gmail.com",
  },
  {
    name: "Satvik Gaikwad",
    role: "Fullstack Developer",
    description: "Built backend APIs.",
    imageUrl: Satvik,
    linkedinUrl: "https://www.linkedin.com/in/satvik-gaikwad-67878b250/",
    githubUrl: "https://github.com/satvik9862",
    mailUrl: "satvik.gaikwad@gmail.com",
  },
];

const Contact = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <Navbar alwaysDark />
      <section className="team-page">
        <h1 className="heading">Meet the Team</h1>
        <p className="team-description">
          Meet the creative minds who designed and developed this platform,
          bringing our vision to life with innovative designs and seamless
          functionality.
        </p>
        <div className="team-cards">
          {teamMembers.map((member, index) => (
            <TeamCard key={index} {...member} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Contact;
