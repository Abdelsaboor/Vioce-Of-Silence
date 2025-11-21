// path: components/3d/GloveModel.tsx
'use client'

import { useRef, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF, useAnimations } from '@react-three/drei'
import { Group } from 'three'
import * as THREE from 'three'

// Type declaration for GLB model
declare module '@react-three/drei' {
  export function useGLTF(path: string): {
    scene: THREE.Group
    animations: THREE.AnimationClip[]
    nodes: Record<string, THREE.Mesh>
    materials: Record<string, THREE.Material>
  }
}

interface GloveModelProps {
  gestureLabel?: string
  animated?: boolean
}

export default function GloveModel({ gestureLabel, animated = true }: GloveModelProps) {
  const groupRef = useRef<Group>(null)
  
  // Load the GLB model - useGLTF must be called unconditionally
  const modelPath = '/models/smart+glove+3d+model.glb'
  const gltf = useGLTF(modelPath)
  const { animations: animationClips, actions } = useAnimations(gltf.animations, groupRef)

  // Animation on gesture recognition
  useEffect(() => {
    if (gestureLabel && actions) {
      // If model has animations, play them
      const actionNames = Object.keys(actions)
      if (actionNames.length > 0) {
        const action = actions[actionNames[0]]
        if (action) {
          action.reset().fadeIn(0.5).play()
          return () => {
            action.fadeOut(0.5)
          }
        }
      }
    }
  }, [gestureLabel, actions])

  // Rotate and float animation
  useFrame((state) => {
    if (groupRef.current && animated) {
      // Gentle floating animation
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.1
      
      // Subtle rotation
      if (!gestureLabel) {
        groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1
      }
    }
  })

  // Render the loaded model
  return (
    <group ref={groupRef} position={[0, 0, 0]} scale={[1, 1, 1]}>
      <primitive object={gltf.scene} />
    </group>
  )
}

// Preload the model for better performance
useGLTF.preload('/models/smart+glove+3d+model.glb')
