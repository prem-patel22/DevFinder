import React, { useState, useEffect } from 'react';
import { FaEye } from 'react-icons/fa';

function VisitorCounter() {
  const [visitors, setVisitors] = useState(0);

  useEffect(() => {
    // Get or initialize visitor count
    let count = localStorage.getItem('visitorCount');
    if (!count) {
      count = Math.floor(Math.random() * 1000) + 100; // Random starting number
      localStorage.setItem('visitorCount', count);
    }
    
    // Increment for new session
    const hasVisited = sessionStorage.getItem('hasVisited');
    if (!hasVisited) {
      count = parseInt(count) + 1;
      localStorage.setItem('visitorCount', count);
      sessionStorage.setItem('hasVisited', 'true');
    }
    
    setVisitors(count);
  }, []);

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      fontSize: '14px',
      color: '#666'
    }}>
      <FaEye /> {visitors.toLocaleString()} visitors
    </div>
  );
}

export default VisitorCounter;