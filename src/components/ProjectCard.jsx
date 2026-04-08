import React from 'react';

function ProjectCard({ title, description, tech, githubLink }) {
  return (
    <div style={{
      border: '1px solid #ddd',
      borderRadius: '8px',
      padding: '15px',
      margin: '10px',
      width: '300px',
      display: 'inline-block',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      <h3>{title}</h3>
      <p>{description}</p>
      <div>
        {tech.map((t, index) => (
          <span key={index} style={{
            background: '#3498db',
            color: 'white',
            padding: '3px 8px',
            borderRadius: '4px',
            fontSize: '12px',
            margin: '2px',
            display: 'inline-block'
          }}>
            {t}
          </span>
        ))}
      </div>
      <a href={githubLink} target="_blank" rel="noopener noreferrer">
        View on GitHub
      </a>
    </div>
  );
}

export default ProjectCard;