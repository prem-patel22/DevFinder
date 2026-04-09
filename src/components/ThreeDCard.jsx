import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Box, Text, Html } from '@react-three/drei';

function RotatingCard({ children, color }) {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (hovered && meshRef.current) {
      meshRef.current.rotation.y += 0.02;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime) * 0.3;
    } else if (meshRef.current) {
      meshRef.current.rotation.y += 0.005;
    }
  });

  return (
    <Box
      ref={meshRef}
      args={[2, 1.5, 0.1]}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <meshStandardMaterial
        color={color}
        roughness={0.2}
        metalness={0.8}
        emissive={hovered ? color : '#000000'}
        emissiveIntensity={0.3}
      />
      <Html position={[0, 0, 0.1]} center>
        <div style={{
          width: '200px',
          textAlign: 'center',
          color: 'white',
          pointerEvents: 'none',
          fontWeight: 'bold',
          fontSize: '14px'
        }}>
          {children}
        </div>
      </Html>
    </Box>
  );
}

function ThreeDCard({ title, tech, color = '#667eea' }) {
  return (
    <div style={{
      height: '300px',
      background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
      borderRadius: '15px',
      overflow: 'hidden',
      cursor: 'pointer'
    }}>
      <Canvas camera={{ position: [0, 0, 4], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-5, -5, -5]} intensity={0.5} color={color} />
        <RotatingCard color={color}>
          <div>
            <h4 style={{ margin: '0 0 10px', fontSize: '16px' }}>{title}</h4>
            <p style={{ fontSize: '12px', margin: 0 }}>{tech}</p>
          </div>
        </RotatingCard>
      </Canvas>
    </div>
  );
}

export default ThreeDCard;