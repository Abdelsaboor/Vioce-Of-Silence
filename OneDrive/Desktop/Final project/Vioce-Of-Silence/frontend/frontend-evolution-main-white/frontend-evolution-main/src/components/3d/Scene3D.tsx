import { useRef, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useGLTF, Environment, Float, PerspectiveCamera, useScroll, ScrollControls, Html } from '@react-three/drei';
import * as THREE from 'three';

// Scene configuration for scroll-driven animation
const SCENE_CONFIG = {
  scenes: [
    {
      id: 'hero',
      camera: { position: [0, 0, 5], rotation: [0, 0, 0] },
      model: { position: [0, 0, 0], rotation: [0, 0, 0], scale: 1 },
    },
    {
      id: 'rotate',
      camera: { position: [3, 1, 4], rotation: [0, 0.3, 0] },
      model: { position: [0, 0, 0], rotation: [0, Math.PI * 0.5, 0], scale: 1.2 },
    },
    {
      id: 'features',
      camera: { position: [-2, 2, 4], rotation: [-0.2, -0.3, 0] },
      model: { position: [0, 0, 0], rotation: [0.3, Math.PI, 0.1], scale: 1.3 },
    },
    {
      id: 'detail',
      camera: { position: [0, 0, 2.5], rotation: [0, 0, 0] },
      model: { position: [0, 0, 0], rotation: [0, Math.PI * 1.5, 0], scale: 1.5 },
    },
    {
      id: 'finale',
      camera: { position: [0, 1, 5], rotation: [-0.1, 0, 0] },
      model: { position: [0, -0.5, 0], rotation: [0.2, Math.PI * 2, 0], scale: 1 },
    },
  ],
};

// Glove 3D Model Component
function GloveModel() {
  const { scene } = useGLTF('/models/smart_glove.glb');
  const modelRef = useRef<THREE.Group>(null);
  const scroll = useScroll();

  useFrame(() => {
    if (!modelRef.current) return;

    const scrollProgress = scroll.offset;
    const numScenes = SCENE_CONFIG.scenes.length;
    const sceneIndex = Math.min(
      Math.floor(scrollProgress * numScenes),
      numScenes - 1
    );
    const nextSceneIndex = Math.min(sceneIndex + 1, numScenes - 1);
    const localProgress = (scrollProgress * numScenes) % 1;

    const currentScene = SCENE_CONFIG.scenes[sceneIndex];
    const nextScene = SCENE_CONFIG.scenes[nextSceneIndex];

    // Interpolate model position
    modelRef.current.position.x = THREE.MathUtils.lerp(
      currentScene.model.position[0],
      nextScene.model.position[0],
      localProgress
    );
    modelRef.current.position.y = THREE.MathUtils.lerp(
      currentScene.model.position[1],
      nextScene.model.position[1],
      localProgress
    );
    modelRef.current.position.z = THREE.MathUtils.lerp(
      currentScene.model.position[2],
      nextScene.model.position[2],
      localProgress
    );

    // Interpolate model rotation
    modelRef.current.rotation.x = THREE.MathUtils.lerp(
      currentScene.model.rotation[0],
      nextScene.model.rotation[0],
      localProgress
    );
    modelRef.current.rotation.y = THREE.MathUtils.lerp(
      currentScene.model.rotation[1],
      nextScene.model.rotation[1],
      localProgress
    );
    modelRef.current.rotation.z = THREE.MathUtils.lerp(
      currentScene.model.rotation[2],
      nextScene.model.rotation[2],
      localProgress
    );

    // Interpolate scale
    const scale = THREE.MathUtils.lerp(
      currentScene.model.scale,
      nextScene.model.scale,
      localProgress
    );
    modelRef.current.scale.setScalar(scale);
  });

  return (
    <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.3}>
      <primitive ref={modelRef} object={scene} />
    </Float>
  );
}

// Camera Controller
function CameraController() {
  const { camera } = useThree();
  const scroll = useScroll();

  useFrame(() => {
    const scrollProgress = scroll.offset;
    const numScenes = SCENE_CONFIG.scenes.length;
    const sceneIndex = Math.min(
      Math.floor(scrollProgress * numScenes),
      numScenes - 1
    );
    const nextSceneIndex = Math.min(sceneIndex + 1, numScenes - 1);
    const localProgress = (scrollProgress * numScenes) % 1;

    // Smooth easing
    const eased = 1 - Math.pow(1 - localProgress, 3);

    const currentScene = SCENE_CONFIG.scenes[sceneIndex];
    const nextScene = SCENE_CONFIG.scenes[nextSceneIndex];

    // Interpolate camera position
    camera.position.x = THREE.MathUtils.lerp(
      currentScene.camera.position[0],
      nextScene.camera.position[0],
      eased
    );
    camera.position.y = THREE.MathUtils.lerp(
      currentScene.camera.position[1],
      nextScene.camera.position[1],
      eased
    );
    camera.position.z = THREE.MathUtils.lerp(
      currentScene.camera.position[2],
      nextScene.camera.position[2],
      eased
    );

    // Interpolate camera rotation
    camera.rotation.x = THREE.MathUtils.lerp(
      currentScene.camera.rotation[0],
      nextScene.camera.rotation[0],
      eased
    );
    camera.rotation.y = THREE.MathUtils.lerp(
      currentScene.camera.rotation[1],
      nextScene.camera.rotation[1],
      eased
    );

    camera.lookAt(0, 0, 0);
  });

  return null;
}

// Lighting Setup
function Lighting() {
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight
        position={[10, 10, 5]}
        intensity={1}
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      <directionalLight position={[-5, 5, -5]} intensity={0.5} color="#4ECDC4" />
      <pointLight position={[0, -5, 0]} intensity={0.3} color="#FFE66D" />
      <spotLight
        position={[0, 10, 0]}
        angle={0.3}
        penumbra={1}
        intensity={0.5}
        castShadow
      />
    </>
  );
}

// Main 3D Scene
function Scene() {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={50} />
      <CameraController />
      <Lighting />
      <Suspense fallback={null}>
        <GloveModel />
        <Environment preset="city" />
      </Suspense>
    </>
  );
}

// Loading Fallback
function Loader() {
  return (
    <Html center>
      <div className="flex flex-col items-center gap-4">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        <p className="text-foreground font-medium">Loading 3D Experience...</p>
      </div>
    </Html>
  );
}

interface Scene3DProps {
  className?: string;
}

export function Scene3D({ className }: Scene3DProps) {
  return (
    <div className={className}>
      <Canvas
        shadows
        dpr={[1, 2]}
        gl={{ 
          antialias: true, 
          alpha: true,
          powerPreference: 'high-performance'
        }}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={<Loader />}>
          <ScrollControls pages={5} damping={0.25}>
            <Scene />
          </ScrollControls>
        </Suspense>
      </Canvas>
    </div>
  );
}

// Preload the model
useGLTF.preload('/models/smart_glove.glb');
