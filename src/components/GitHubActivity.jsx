import React, { useState, useEffect } from 'react';
import { FaGithub, FaStar, FaCodeBranch, FaCalendar, FaClock, FaUser, FaExternalLinkAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';

function GitHubActivity() {
  const [repos, setRepos] = useState([]);
  const [contributions, setContributions] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGitHubData = async () => {
      try {
        // Fetch repositories
        const reposResponse = await fetch('https://api.github.com/users/prem-patel22/repos?sort=updated&per_page=6');
        const reposData = await reposResponse.json();
        
        if (Array.isArray(reposData)) {
          setRepos(reposData);
        }
        
        // Fetch user data for contribution stats
        const userResponse = await fetch('https://api.github.com/users/prem-patel22');
        const userData = await userResponse.json();
        
        if (userData) {
          setContributions({
            publicRepos: userData.public_repos || 0,
            followers: userData.followers || 0,
            following: userData.following || 0,
            joined: userData.created_at ? new Date(userData.created_at).toLocaleDateString() : 'N/A'
          });
        }
        
        setLoading(false);
      } catch (err) {
        console.error('Error fetching GitHub data:', err);
        setError('Failed to load GitHub data');
        setLoading(false);
      }
    };
    
    fetchGitHubData();
  }, []);

  if (loading) {
    return (
      <div style={{
        background: 'white',
        borderRadius: '15px',
        padding: '30px',
        textAlign: 'center'
      }}>
        <p>Loading GitHub activity...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{
        background: 'white',
        borderRadius: '15px',
        padding: '30px',
        textAlign: 'center'
      }}>
        <p style={{ color: '#e74c3c' }}>{error}</p>
      </div>
    );
  }

  return (
    <div style={{ marginTop: '40px' }}>
      <h3 style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: '10px', 
        marginBottom: '25px',
        color: '#333',
        fontSize: '1.5rem'
      }}>
        <FaGithub style={{ color: '#667eea' }} /> GitHub Activity
      </h3>
      
      {/* Stats Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
        gap: '15px',
        marginBottom: '30px'
      }}>
        <div style={{
          background: 'linear-gradient(135deg, #667eea20 0%, #764ba220 100%)',
          padding: '15px',
          borderRadius: '12px',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#667eea' }}>
            {contributions?.publicRepos || 0}
          </div>
          <div style={{ fontSize: '12px', color: '#666' }}>Public Repos</div>
        </div>
        <div style={{
          background: 'linear-gradient(135deg, #667eea20 0%, #764ba220 100%)',
          padding: '15px',
          borderRadius: '12px',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#667eea' }}>
            {contributions?.followers || 0}
          </div>
          <div style={{ fontSize: '12px', color: '#666' }}>Followers</div>
        </div>
        <div style={{
          background: 'linear-gradient(135deg, #667eea20 0%, #764ba220 100%)',
          padding: '15px',
          borderRadius: '12px',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#667eea' }}>
            {contributions?.following || 0}
          </div>
          <div style={{ fontSize: '12px', color: '#666' }}>Following</div>
        </div>
        <div style={{
          background: 'linear-gradient(135deg, #667eea20 0%, #764ba220 100%)',
          padding: '15px',
          borderRadius: '12px',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#667eea' }}>
            {contributions?.joined || 'N/A'}
          </div>
          <div style={{ fontSize: '12px', color: '#666' }}>Joined GitHub</div>
        </div>
      </div>
      
      {/* Contribution Graph Placeholder */}
      <div style={{
        background: '#0D1117',
        borderRadius: '12px',
        padding: '20px',
        marginBottom: '30px',
        textAlign: 'center'
      }}>
        <h4 style={{ color: 'white', marginBottom: '15px' }}>📊 Contribution Activity</h4>
        <img 
          src="https://ghchart.rshah.org/prem-patel22"
          alt="GitHub Contributions Chart"
          style={{ width: '100%', maxWidth: '800px', borderRadius: '8px' }}
          onError={(e) => {
            e.target.style.display = 'none';
            e.target.parentElement.innerHTML = '<p style="color: #888;">Contribution chart loading...</p>';
          }}
        />
        <p style={{ color: '#888', fontSize: '12px', marginTop: '10px' }}>
          <FaCalendar style={{ marginRight: '5px' }} /> Last year contribution activity
        </p>
      </div>
      
      {/* Latest Repositories */}
      <h4 style={{ marginBottom: '15px', color: '#333' }}>📦 Latest Repositories</h4>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '15px'
      }}>
        {repos.map((repo, index) => (
          <motion.a
            key={repo.id}
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            style={{
              textDecoration: 'none',
              background: '#f8f9fa',
              padding: '15px',
              borderRadius: '12px',
              transition: 'transform 0.3s',
              display: 'block',
              border: '1px solid #e0e0e0'
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '10px' }}>
              <h4 style={{ color: '#667eea', margin: 0, fontSize: '16px' }}>
                {repo.name}
              </h4>
              <FaExternalLinkAlt style={{ color: '#999', fontSize: '12px' }} />
            </div>
            <p style={{ color: '#666', fontSize: '13px', marginBottom: '10px', lineHeight: '1.5' }}>
              {repo.description || 'No description provided'}
            </p>
            <div style={{ display: 'flex', gap: '15px', fontSize: '12px', color: '#999' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <FaStar /> {repo.stargazers_count}
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <FaCodeBranch /> {repo.forks_count}
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <FaClock /> {new Date(repo.updated_at).toLocaleDateString()}
              </span>
            </div>
            <div style={{ marginTop: '10px' }}>
              <span style={{
                background: '#e0e0e0',
                padding: '2px 8px',
                borderRadius: '12px',
                fontSize: '10px',
                color: '#667eea'
              }}>
                {repo.language || 'N/A'}
              </span>
            </div>
          </motion.a>
        ))}
      </div>
      
      {/* View All Link */}
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <a
          href="https://github.com/prem-patel22"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            color: '#667eea',
            textDecoration: 'none',
            fontWeight: 'bold'
          }}
        >
          View all repositories on GitHub <FaExternalLinkAlt />
        </a>
      </div>
    </div>
  );
}

export default GitHubActivity;