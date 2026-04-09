import React, { useEffect, useState } from 'react';
import { FaTachometerAlt, FaClock, FaChartLine } from 'react-icons/fa';

function PerformanceMonitor() {
  const [metrics, setMetrics] = useState({
    loadTime: 0,
    domContentLoaded: 0,
    firstPaint: 0,
    firstContentfulPaint: 0
  });
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    // Wait for page to fully load
    const calculateMetrics = () => {
      if (window.performance && window.performance.timing) {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        const domReadyTime = perfData.domContentLoadedEventEnd - perfData.navigationStart;
        
        // Get paint metrics if available
        let firstPaint = 0;
        let firstContentfulPaint = 0;
        
        if (performance.getEntriesByType) {
          const paintEntries = performance.getEntriesByType('paint');
          paintEntries.forEach(entry => {
            if (entry.name === 'first-paint') {
              firstPaint = entry.startTime;
            }
            if (entry.name === 'first-contentful-paint') {
              firstContentfulPaint = entry.startTime;
            }
          });
        }
        
        setMetrics({
          loadTime: pageLoadTime > 0 ? pageLoadTime : 0,
          domContentLoaded: domReadyTime > 0 ? domReadyTime : 0,
          firstPaint: firstPaint,
          firstContentfulPaint: firstContentfulPaint
        });
      } else {
        // Fallback for newer browsers
        setTimeout(() => {
          const loadTime = performance.now();
          setMetrics({
            loadTime: loadTime,
            domContentLoaded: loadTime,
            firstPaint: loadTime,
            firstContentfulPaint: loadTime
          });
        }, 100);
      }
    };

    // Calculate after page load
    if (document.readyState === 'complete') {
      calculateMetrics();
    } else {
      window.addEventListener('load', calculateMetrics);
      return () => window.removeEventListener('load', calculateMetrics);
    }
  }, []);

  const getPerformanceGrade = (time) => {
    if (time === 0) return { grade: 'Calculating...', color: '#f59e0b' };
    if (time < 1000) return { grade: 'Excellent', color: '#10b981' };
    if (time < 2000) return { grade: 'Good', color: '#f59e0b' };
    if (time < 3000) return { grade: 'Fair', color: '#f59e0b' };
    return { grade: 'Needs Improvement', color: '#ef4444' };
  };

  const loadGrade = getPerformanceGrade(metrics.loadTime);
  const domGrade = getPerformanceGrade(metrics.domContentLoaded);

  // Don't show if metrics are still loading (0)
  if (metrics.loadTime === 0 && metrics.domContentLoaded === 0) {
    return (
      <div style={{
        position: 'fixed',
        bottom: '20px',
        left: '20px',
        background: 'rgba(0,0,0,0.8)',
        backdropFilter: 'blur(10px)',
        borderRadius: '12px',
        padding: '8px 16px',
        color: 'white',
        fontSize: '12px',
        zIndex: 9999,
        fontFamily: 'monospace',
        border: '2px solid #f59e0b',
        cursor: 'pointer'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <FaTachometerAlt style={{ animation: 'spin 1s linear infinite' }} />
          <span>Measuring performance...</span>
        </div>
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div 
      style={{
        position: 'fixed',
        bottom: '20px',
        left: '20px',
        background: 'rgba(0,0,0,0.85)',
        backdropFilter: 'blur(10px)',
        borderRadius: '12px',
        padding: '10px 16px',
        color: 'white',
        fontSize: '12px',
        zIndex: 9999,
        fontFamily: 'monospace',
        borderLeft: `4px solid ${loadGrade.color}`,
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
      }}
      onClick={() => setShowDetails(!showDetails)}
      onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
      onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <FaTachometerAlt color={loadGrade.color} />
          <span>
            Load: <strong style={{ color: loadGrade.color }}>{(metrics.loadTime / 1000).toFixed(2)}s</strong>
          </span>
          <span style={{ fontSize: '10px', color: loadGrade.color }}>({loadGrade.grade})</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <FaClock />
          <span>DOM: {(metrics.domContentLoaded / 1000).toFixed(2)}s</span>
        </div>
        <div style={{ fontSize: '10px', color: '#888' }}>
          <FaChartLine /> Click for details
        </div>
      </div>
      
      {showDetails && (
        <div style={{
          marginTop: '10px',
          paddingTop: '10px',
          borderTop: '1px solid rgba(255,255,255,0.2)',
          fontSize: '11px'
        }}>
          <div>⚡ First Paint: {(metrics.firstPaint / 1000).toFixed(2)}s</div>
          <div>🎨 First Contentful Paint: {(metrics.firstContentfulPaint / 1000).toFixed(2)}s</div>
          <div style={{ marginTop: '8px' }}>
            <a 
              href="https://pagespeed.web.dev/report?url=https://prem-patel22.github.io/DevFinder"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#667eea', textDecoration: 'none' }}
              onClick={(e) => e.stopPropagation()}
            >
              📊 View full report on PageSpeed Insights →
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

export default PerformanceMonitor;