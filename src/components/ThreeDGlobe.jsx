import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, Html, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

function RotatingSphere() {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.2;
    }
  });

  return (
    <Sphere
      ref={meshRef}
      args={[1.5, 64, 64]}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <meshStandardMaterial
        color={hovered ? '#764ba2' : '#667eea'}
        roughness={0.3}
        metalness={0.7}
        emissive={hovered ? '#764ba2' : '#667eea'}
        emissiveIntensity={0.2}
      />
    </Sphere>
  );
}

function Particles() {
  const particlesRef = useRef();
  const particleCount = 2000;
  const positions = new Float32Array(particleCount * 3);

  for (let i = 0; i < particleCount; i++) {
    const radius = 2.5;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    
    positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
    positions[i * 3 + 2] = radius * Math.cos(phi);
  }

  useFrame(() => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y += 0.002;
      particlesRef.current.rotation.x += 0.001;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial color="#667eea" size={0.02} transparent opacity={0.6} />
    </points>
  );
}

function ThreeDGlobe() {
  return (
    <div style={{
      width: '100%',
      height: '400px',
      background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
      borderRadius: '20px',
      overflow: 'hidden',
      position: 'relative',
      marginTop: '40px'
    }}>
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#764ba2" />
        <RotatingSphere />
        <Particles />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate={false}
          enableRotate={true}
        />
      </Canvas>
      <div style={{
        position: 'absolute',
        bottom: '20px',
        left: 0,
        right: 0,
        textAlign: 'center',
        color: 'white',
        fontSize: '14px',
        background: 'rgba(0,0,0,0.5)',
        padding: '8px',
        borderRadius: '20px',
        width: 'fit-content',
        margin: '0 auto'
      }}>
        ✨ Interactive 3D Tech Globe | Drag to rotate
      </div>
    </div>
  );
}

export default ThreeDGlobe;