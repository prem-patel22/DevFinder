import React, { useState, useEffect } from 'react';
import { FaGithub, FaStar, FaCodeBranch, FaCalendar } from 'react-icons/fa';

function GitHubActivity() {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://api.github.com/users/prem-patel22/repos?sort=updated&per_page=6')
      .then(res => res.json())
      .then(data => {
        setRepos(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching repos:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '20px' }}>Loading GitHub activity...</div>;
  }

  return (
    <div style={{ marginTop: '30px' }}>
      <h3 style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
        <FaGithub /> Recent GitHub Activity
      </h3>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
        gap: '15px'
      }}>
        {repos.map(repo => (
          <a
            key={repo.id}
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              textDecoration: 'none',
              background: '#f8f9fa',
              padding: '15px',
              borderRadius: '10px',
              transition: 'transform 0.3s',
              display: 'block'
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          >
            <h4 style={{ color: '#667eea', marginBottom: '10px' }}>{repo.name}</h4>
            <p style={{ color: '#666', fontSize: '13px', marginBottom: '10px' }}>
              {repo.description || 'No description'}
            </p>
            <div style={{ display: 'flex', gap: '15px', fontSize: '12px', color: '#999' }}>
              <span><FaStar /> {repo.stargazers_count}</span>
              <span><FaCodeBranch /> {repo.forks_count}</span>
              <span><FaCalendar /> {new Date(repo.updated_at).toLocaleDateString()}</span>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

export default GitHubActivity;