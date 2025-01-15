import React from 'react';
import { FaLinkedin, FaGithub, FaEnvelope } from 'react-icons/fa'; 
import './css/Card.css'; 

const TeamCard = ({ name, role, description, imageUrl, linkedinUrl, githubUrl, mailUrl }) => {
  return (
    <div className="team-card">
      {/* Team Member Image */}
      <img src={imageUrl} alt={name} className="team-image" />
      
      {/* Team Member Name */}
      <h2>{name}</h2>

      {/* Social Icons Section */}
      <div className="team-card-icons">
        {/* LinkedIn */}
        <a href={linkedinUrl} target="_blank" rel="noopener noreferrer" className="icon">
          <FaLinkedin style={{color:"#0077b5"}}/>
        </a>
        {/* GitHub */}
        <a href={githubUrl} target="_blank" rel="noopener noreferrer" className="icon">
          <FaGithub style={{color:"#333"}}/>
        </a>
        {/* Email */}
        <a href={`mailto:${mailUrl}`} className="icon">
          <FaEnvelope style={{color:"#EA4335"}}/>
        </a>
      </div>
      
      {/* Team Member Role */}
      <p className="team-role">{role}</p>
      
      {/* Team Member Description */}
      <p className="team-description">{description}</p>
      
    </div>
  );
};

export default TeamCard;
