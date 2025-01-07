import React from 'react';
import Navbar from '../components/Navbar'; 
import TeamCard from '../components/Card'; 
import './Team.css'; 
import Atharva from '../assets/atharva.png';
import Kshitij from '../assets/Kshitij.png';
import Shlok from '../assets/Shlok.jpg';
import Sakshi from '../assets/sakshi.jpeg';
import Satvik from '../assets/satvik.jpeg';

const teamMembers = [
  {
    name: 'Atharva Dhake',
    role: 'Fullstack Developer',
    description: 'Developed the UI of the website.',
    imageUrl: Atharva, 
    linkedinUrl: 'https://www.linkedin.com/in/atharva-dhake-155160258/',
    githubUrl: 'https://github.com/atharva-dhake',
    mailUrl: 'atharvadhake01@gmail.com',
  },
  {
    name: 'Kshitij Dhake',
    role: 'Fullstack Developer',
    description: 'Built the backend APIs.',
    imageUrl: Kshitij,
    linkedinUrl: 'https://www.linkedin.com/in/kshitijdhake/',
    githubUrl: 'https://github.com/ksdhake28',
    mailUrl: 'kdhake289@gmail.com',
  },
  {
    name: 'Sakshi Gangurde',
    role: 'Fullstack Developer',
    description: 'Built the backend APIs.',
    imageUrl: Sakshi,
    linkedinUrl: 'https://www.linkedin.com/in/sakshi-s-gangurde/',
    githubUrl: 'https://github.com/sakshig711',
    mailUrl: 'gangurdesakshi711@gmail.com',
  },
  {
    name: 'Shlok Gaidhani',
    role: 'Fullstack Developer',
    description: 'Built the backend APIs.',
    imageUrl: Shlok,
    linkedinUrl: 'https://www.linkedin.com/in/shlok-gaidhani-57135629a/',
    githubUrl: 'https://github.com/Shlok-06',
    mailUrl: 'gaidhanishlok2004@gmail.com',
  },
  {
    name: 'Satvik Gaikwad',
    role: 'Fullstack Developer',
    description: 'Built the backend APIs.',
    imageUrl: Satvik,
    linkedinUrl: 'https://www.linkedin.com/in/atharva-dhake',
    githubUrl: 'https://github.com/satvik9862',
    mailUrl: 'https://www.linkedin.com/in/satvik-gaikwad-67878b250/',
  },
];

const Contact= () => {
  return (
    <div>
      <Navbar alwaysDark={true} />
      
      <div className="team-page">
        <h1 className='heading'>Meet the Team</h1>
        <h5 className="team-description">
          Discover the creative minds behind our website's design and development. 
          Meet our team of talented individuals who collaborated to bring our vision to life through captivating logos, 
          innovative designs, and a cohesive platform.
        </h5>
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

export default Contact;
