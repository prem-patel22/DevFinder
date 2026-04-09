import React, { useEffect, useState } from 'react';
import { FaTachometerAlt, FaClock, FaImage, FaCode } from 'react-icons/fa';

function PerformanceMonitor() {
  const [metrics, setMetrics] = useState({
    loadTime: 0,
    domContentLoaded: 0,
    firstPaint: 0,
    firstContentfulPaint: 0
  });

  useEffect(() => {
    if (window.performance) {
      const perfData = window.performance.timing;
      const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
      const domReadyTime = perfData.domContentLoadedEventEnd - perfData.navigationStart;
      
      setMetrics({
        loadTime: pageLoadTime,
        domContentLoaded: domReadyTime,
        firstPaint: performance.getEntriesByType('paint')[0]?.startTime || 0,
        firstContentfulPaint: performance.getEntriesByType('paint')[1]?.startTime || 0
      });
    }
  }, []);

  const getPerformanceGrade = (time) => {
    if (time < 1000) return { grade: 'Excellent', color: '#10b981' };
    if (time < 2000) return { grade: 'Good', color: '#f59e0b' };
    return { grade: 'Needs Improvement', color: '#ef4444' };
  };

  const loadGrade = getPerformanceGrade(metrics.loadTime);

  return (
    <div style={{
      position: 'fixed',
      bottom: '20px',
      left: '20px',
      background: 'rgba(0,0,0,0.8)',
      backdropFilter: 'blur(10px)',
      borderRadius: '12px',
      padding: '12px 16px',
      color: 'white',
      fontSize: '12px',
      zIndex: 999,
      fontFamily: 'monospace',
      border: `2px solid ${loadGrade.color}`,
      cursor: 'pointer',
      transition: 'all 0.3s'
    }}
    onClick={() => window.open('https://pagespeed.web.dev/report?url=https://prem-patel22.github.io/DevFinder', '_blank')}
    title="Click to view full performance report">
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <FaTachometerAlt color={loadGrade.color} />
          <span>Load: <strong style={{ color: loadGrade.color }}>{(metrics.loadTime / 1000).toFixed(2)}s</strong></span>
          <span style={{ fontSize: '10px', color: loadGrade.color }}>({loadGrade.grade})</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <FaClock />
          <span>DOM: {(metrics.domContentLoaded / 1000).toFixed(2)}s</span>
        </div>
      </div>
    </div>
  );
}

export default PerformanceMonitor;