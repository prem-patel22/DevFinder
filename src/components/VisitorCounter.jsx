import React, { useState, useEffect } from 'react';
import { FaEye, FaUser } from 'react-icons/fa';

function VisitorCounter() {
  const [visitors, setVisitors] = useState(0);
  const [todayVisitors, setTodayVisitors] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeVisitorCount = () => {
      let totalCount = localStorage.getItem('totalVisitors');
      if (!totalCount) {
        totalCount = Math.floor(Math.random() * 500) + 100;
        localStorage.setItem('totalVisitors', totalCount);
      }
      
      const today = new Date().toDateString();
      let todayCount = localStorage.getItem('todayVisitors');
      let lastDate = localStorage.getItem('lastVisitDate');
      
      if (lastDate !== today) {
        todayCount = 0;
        localStorage.setItem('lastVisitDate', today);
      }
      
      if (!todayCount) {
        todayCount = 0;
      }
      
      const hasVisited = sessionStorage.getItem('hasVisited');
      if (!hasVisited) {
        totalCount = parseInt(totalCount) + 1;
        todayCount = parseInt(todayCount) + 1;
        localStorage.setItem('totalVisitors', totalCount);
        localStorage.setItem('todayVisitors', todayCount);
        sessionStorage.setItem('hasVisited', 'true');
      }
      
      setVisitors(parseInt(totalCount));
      setTodayVisitors(parseInt(todayCount));
      setLoading(false);
    };
    
    initializeVisitorCount();
  }, []);

  if (loading) {
    return <div style={{ display: 'flex', gap: '15px' }}>Loading...</div>;
  }

  return (
    <div style={{
      display: 'flex',
      gap: '15px',
      alignItems: 'center',
      background: '#f8f9fa',
      padding: '6px 14px',
      borderRadius: '25px',
      fontSize: '13px'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#667eea' }}>
        <FaEye /> <strong>{visitors.toLocaleString()}</strong> <span style={{ color: '#666' }}>Total</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#10b981' }}>
        <FaUser /> <strong>{todayVisitors}</strong> <span style={{ color: '#666' }}>Today</span>
      </div>
    </div>
  );
}

export default VisitorCounter;