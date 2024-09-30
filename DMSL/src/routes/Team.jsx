import React from 'react';
import Navbar from '../components/Navbar'; 
import HeroImg from '../components/HeroImg'; 
import TeamCard from '../components/Card'; 
import './Team.css'; 

const teamMembers = [
  {
    name: 'Atharva Dhake',
    role: 'Fullstack Developer',
    description: 'Developed the UI of the website.',
    imageUrl: '../assets/atharva.png', 
  },
  {
    name: 'Kshitij Dhake',
    role: 'Fullstack Developer',
    description: 'Built the backend APIs.',
    imageUrl: 'path-to-image',
  },
  {
    name: 'Sakshi Gangurde',
    role: 'Fullstack Developer',
    description: 'Built the backend APIs.',
    imageUrl: 'path-to-image',
  },
  {
    name: 'Shlok Gaidhani',
    role: 'Fullstack Developer',
    description: 'Built the backend APIs.',
    imageUrl: 'path-to-image',
  },
  {
    name: 'Satvik Gaikwad',
    role: 'Fullstack Developer',
    description: 'Built the backend APIs.',
    imageUrl: 'path-to-image',
  },
];

const Team = () => {
  return (
    <div>
      <Navbar alwaysDark={true} />
      <HeroImg /> 
      <div className="team-page">
        <h1>Meet the Team</h1>
        <div className="team-cards">
          {teamMembers.map((member, index) => (
            <TeamCard
              key={index}
              name={member.name}
              role={member.role}
              description={member.description}
              imageUrl={member.imageUrl}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Team;
