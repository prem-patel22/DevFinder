import React from 'react';
import { motion } from 'framer-motion';

function SkeletonCard() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      style={{
        background: 'white',
        borderRadius: '20px',
        overflow: 'hidden',
        boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
      }}
    >
      <div style={{
        height: '150px',
        background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
        backgroundSize: '200% 100%',
        animation: 'shimmer 1.5s infinite'
      }} />
      <div style={{ padding: '20px' }}>
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
          height: '40px',
          width: '100%',
          background: '#f0f0f0',
          borderRadius: '8px'
        }} />
      </div>
    </motion.div>
  );
}

export default SkeletonCard;