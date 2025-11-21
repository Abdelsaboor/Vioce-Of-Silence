// path: components/3d/Scene.tsx
'use client'

import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment, PerspectiveCamera } from '@react-three/drei'
import GloveModel from './GloveModel'

export default function Scene() {
  return (
    <div className="w-full h-full rounded-xl overflow-hidden bg-gradient-to-br from-background to-background/80 border border-gradient-cyan/30">
      <Canvas
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
        className="w-full h-full"
      >
        <Suspense fallback={
          <mesh>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color="#7A3DFF" wireframe />
          </mesh>
        }>
          <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={50} />
          
          {/* Lighting */}
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <pointLight position={[-10, -10, -5]} intensity={0.5} color="#33D6F0" />
          <pointLight position={[10, -10, -5]} intensity={0.5} color="#B67FFC" />
          
          {/* Environment for reflections */}
          <Environment preset="night" />
          
          {/* 3D Glove Model */}
          <GloveModel />
          
          {/* Orbit Controls - limited rotation */}
          <OrbitControls
            enableZoom={true}
            enablePan={false}
            minDistance={3}
            maxDistance={8}
            minPolarAngle={Math.PI / 3}
            maxPolarAngle={Math.PI / 1.5}
            autoRotate={true}
            autoRotateSpeed={0.5}
          />
        </Suspense>
      </Canvas>
    </div>
  )
}
