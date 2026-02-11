import { useEffect, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';
import { createExtrudedMesh } from './shapeToMesh';

interface ThreeDViewerProps {
  points: Array<{ x: number; y: number }>;
}

function Scene({ points }: { points: Array<{ x: number; y: number }> }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);

  useEffect(() => {
    if (points.length < 3) return;
    
    const mesh = createExtrudedMesh(points);
    if (meshRef.current && groupRef.current) {
      // Remove old mesh
      groupRef.current.clear();
      // Add new mesh
      groupRef.current.add(mesh);
    }
  }, [points]);

  useFrame((state) => {
    if (groupRef.current) {
      // Gentle rotation animation
      groupRef.current.rotation.y += 0.005;
    }
  });

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 8]} />
      <OrbitControls 
        enableZoom={true}
        enablePan={true}
        minDistance={3}
        maxDistance={15}
      />
      
      {/* Lighting */}
      <ambientLight intensity={0.6} />
      <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
      <directionalLight position={[-10, -10, -5]} intensity={0.5} />
      <pointLight position={[0, 5, 0]} intensity={0.5} color="#ffd4d4" />
      
      {/* Mesh group */}
      <group ref={groupRef}>
        <mesh ref={meshRef} />
      </group>
      
      {/* Background */}
      <color attach="background" args={['#fef6f0']} />
    </>
  );
}

export function ThreeDViewer({ points }: ThreeDViewerProps) {
  return (
    <div className="w-full aspect-square rounded-lg overflow-hidden border-2 border-romantic-rose/30 bg-romantic-cream">
      <Canvas shadows>
        <Scene points={points} />
      </Canvas>
    </div>
  );
}
