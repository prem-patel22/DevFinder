import React from 'react';
import { motion } from 'framer-motion';
import SkeletonCard from './SkeletonCard';

function SkeletonLoader({ type = 'projects', count = 6 }) {
  const getSkeletons = () => {
    switch(type) {
      case 'projects':
        return Array(count).fill().map((_, i) => <SkeletonCard key={i} />);
      case 'blog':
        return Array(count).fill().map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            style={{
              background: 'white',
              borderRadius: '20px',
              padding: '20px',
              boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
            }}
          >
            <div style={{
              height: '40px',
              width: '60px',
              background: '#f0f0f0',
              borderRadius: '8px',
              marginBottom: '15px'
            }} />
            <div style={{
              height: '24px',
              width: '80%',
              background: '#f0f0f0',
              borderRadius: '8px',
              marginBottom: '15px'
            }} />
            <div style={{
              height: '60px',
              width: '100%',
              background: '#f0f0f0',
              borderRadius: '8px',
              marginBottom: '15px'
            }} />
            <div style={{
              height: '20px',
              width: '40%',
              background: '#f0f0f0',
              borderRadius: '8px'
            }} />
          </motion.div>
        ));
      default:
        return Array(count).fill().map((_, i) => <SkeletonCard key={i} />);
    }
  };

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
      gap: '30px',
      padding: '20px'
    }}>
      {getSkeletons()}
    </div>
  );
}

export default SkeletonLoader;