import React from 'react';
import Navbar from '../components/Nav.jsx'; 
import TeamCard from '../components/Card.jsx';
import './css/About.css';
import Hod from '../assets/hod.jpg';
import Jakate from '../assets/Jakhete.jpg';
import Hiray from '../assets/hiray.jpg';
import Archana from '../assets/Archana_Kadam.jpg';
// Uncomment and ensure this image exists if needed
// import Satvik from '../assets/satvik.jpeg';

const teamMembers = [
  {
    name: 'DR. A. S. Ghotkar',
    role: 'Associate Prof. and Head, Dept. of Information Technology',
    location: 'Pict, Pune, India',
    email: 'aagtokar@pict.edu',
    imageUrl: Hod,
  },
  {
    name: 'Sumitra A. Jakate',
    role: 'Associate Prof. at Dept. of Information Technology',
    location: 'Pict, Pune, India',
    imageUrl: Jakate,
    linkedinUrl: 'https://www.linkedin.com/in/atharva-dhake-155160258/',
    githubUrl: 'https://github.com/atharva-dhake',
    mailUrl: 'atharvadhake01@gmail.com',
  },
  {
    name: 'Swapnaja R. Hiray',
    role: 'Associate Prof. at Dept. of Information Technology',
    location: 'Pict, Pune, India',
    email: 'srhiray@pict.edu',
    imageUrl: Hiray,
  },
  {
    name: 'Archana S. Kadam',
    role: 'Associate Prof. at Dept. of Information Technology',
    location: 'Pict, Pune, India',
    email: 'askadam@pict.edu',
    imageUrl: Archana,
  },
];

const About = () => {
  return (
    <div>
      {/* Ensure Navbar is imported and used properly */}
      {/* <Navbar alwaysDark={true} /> */}
      <Navbar alwaysDark={true} />
      <div className="about-page">
        <h1 className="heading">Meet the Teachers</h1>
        <h5 className="team-description">
          Discover the creative minds behind our website's design and development.
        </h5>
        <div className="about-cards">
          {teamMembers.map((member, index) => (
            <TeamCard
              key={index}
              name={member.name}
              role={member.role}
              description={`${member.location} | ${member.email}`}
              imageUrl={member.imageUrl}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;
