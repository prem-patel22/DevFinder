import React from 'react';
import { FaGithub } from 'react-icons/fa';

function DeveloperCard({ name, role, skills, github, avatar }) {
  return (
    <div style={{
      border: '1px solid #ddd',
      borderRadius: '8px',
      padding: '15px',
      margin: '10px',
      width: '250px',
      textAlign: 'center',
      display: 'inline-block',
      backgroundColor: 'white',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      <img src={avatar} alt={name} style={{
        width: '100px',
        height: '100px',
        borderRadius: '50%',
        objectFit: 'cover'
      }} />
      <h3>{name}</h3>
      <p style={{ color: '#666' }}>{role}</p>
      <div>
        {skills.map((skill, index) => (
          <span key={index} style={{
            background: '#e74c3c',
            color: 'white',
            padding: '2px 6px',
            borderRadius: '3px',
            fontSize: '11px',
            margin: '2px',
            display: 'inline-block'
          }}>
            {skill}
          </span>
        ))}
      </div>
      <a href={github} target="_blank" rel="noopener noreferrer" style={{ 
        display: 'inline-block', 
        marginTop: '10px',
        color: '#3498db',
        textDecoration: 'none'
      }}>
        <FaGithub /> GitHub
      </a>
    </div>
  );
}

export default DeveloperCard;