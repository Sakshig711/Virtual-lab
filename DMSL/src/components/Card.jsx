import React from 'react';
import { FaLinkedin, FaGithub, FaEnvelope } from 'react-icons/fa'; 
import './css/Card.css'; 

const TeamCard = ({ name, role, description, imageUrl, linkedinUrl, githubUrl, mailUrl, showGithub = true }) => {
  return (
    <div className="team-card">
      {/* Team Member Image with Fallback */}
      <img 
        src={imageUrl || 'https://via.placeholder.com/150'} 
        alt={name || "Team Member"} 
        className="team-image" 
      />
      
      {/* Team Member Name */}
      <h2 className="team-name">{name}</h2>

      {/* Social Icons Section */}
      <div className="team-card-icons">
        {/* LinkedIn */}
        {linkedinUrl && (
          <a 
            href={linkedinUrl} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="icon"
            aria-label="LinkedIn Profile"
          >
            <FaLinkedin style={{ color: "#0077b5" }} />
          </a>
        )}

        {/* GitHub - Only Show if Allowed */}
        {showGithub && githubUrl && (
          <a 
            href={githubUrl} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="icon"
            aria-label="GitHub Profile"
          >
            <FaGithub style={{ color: "#333" }} />
          </a>
        )}

        {/* Email */}
        {mailUrl && (
          <a 
            href={`mailto:${mailUrl}`} 
            className="icon"
            aria-label="Send Email"
          >
            <FaEnvelope style={{ color: "#EA4335" }} />
          </a>
        )}
      </div>

      {/* Team Member Role */}
      <p className="team-role">{role}</p>

      {/* Team Member Description */}
      <p className="team-description">{description}</p>
    </div>
  );
};

export default TeamCard;
