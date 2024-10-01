import React from 'react';
import Navbar from '../components/Navbar'; 
import TeamCard from '../components/Card'; 
import './Team.css'; 
import Atharva from '../assets/atharva.png';
import Kshitij from '../assets/Kshitij.png';
import Shlok from '../assets/Shlok.jpg';
import Sakshi from '../assets/Sakshi.jpeg';
import Satvik from '../assets/satvik.jpeg';

const teamMembers = [
  {
    name: 'Atharva Dhake',
    role: 'Fullstack Developer',
    description: 'Developed the UI of the website.',
    imageUrl: Atharva, 
    linkedinUrl: 'https://www.linkedin.com/in/atharva-dhake',
    githubUrl: 'https://github.com/atharva-dhake',
    mailUrl: 'atharva@example.com',
  },
  {
    name: 'Kshitij Dhake',
    role: 'Fullstack Developer',
    description: 'Built the backend APIs.',
    imageUrl: Kshitij,
    linkedinUrl: 'https://www.linkedin.com/in/atharva-dhake',
    githubUrl: 'https://github.com/atharva-dhake',
    mailUrl: 'atharva@example.com',
  },
  {
    name: 'Sakshi Gangurde',
    role: 'Fullstack Developer',
    description: 'Built the backend APIs.',
    imageUrl: Sakshi,
    linkedinUrl: 'https://www.linkedin.com/in/atharva-dhake',
    githubUrl: 'https://github.com/atharva-dhake',
    mailUrl: 'atharva@example.com',
  },
  {
    name: 'Shlok Gaidhani',
    role: 'Fullstack Developer',
    description: 'Built the backend APIs.',
    imageUrl: Shlok,
    linkedinUrl: 'https://www.linkedin.com/in/atharva-dhake',
    githubUrl: 'https://github.com/atharva-dhake',
    mailUrl: 'atharva@example.com',
  },
  {
    name: 'Satvik Gaikwad',
    role: 'Fullstack Developer',
    description: 'Built the backend APIs.',
    imageUrl: Satvik,
    linkedinUrl: 'https://www.linkedin.com/in/atharva-dhake',
    githubUrl: 'https://github.com/atharva-dhake',
    mailUrl: 'atharva@example.com',
  },
];

const Team = () => {
  return (
    <div>
      <Navbar alwaysDark={true} />
      
      <div className="team-page">
        <h1>Meet the Team</h1>
        <p className="team-description">
          Discover the creative minds behind our website's design and development. 
          Meet our team of talented individuals who collaborated to bring our vision to life through captivating logos, 
          innovative designs, and a cohesive platform.
        </p>
        <div className="team-cards">
          {teamMembers.map((member, index) => (
            <TeamCard
              key={index}
              name={member.name}
              role={member.role}
              description={member.description}
              imageUrl={member.imageUrl}
              linkedinUrl={member.linkedinUrl}
              githubUrl={member.githubUrl}
              mailUrl={member.mailUrl}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Team;
