import React from 'react';
import './Card.css'; 

const TeamCard = ({ name, role, description, imageUrl }) => {
  return (
    <div className="team-card">
      <img src={imageUrl} alt={name} className="team-image" />
      <h2>{name}</h2>
      <p>{role}</p>
      <p>{description}</p>
    </div>
  );
};

export default TeamCard;
