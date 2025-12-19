import { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useGLTF, Environment, Float, Html } from '@react-three/drei';
import * as THREE from 'three';
import { Suspense } from 'react';

// Scene sections content
const sections = [
  {
    id: 'hero',
    title: 'Voice of Silence',
    subtitle: 'The Future of Silent Communication',
    description: 'Transform hand gestures into seamless communication with cutting-edge AI technology.',
  },
  {
    id: 'precision',
    title: 'Precision Tracking',
    subtitle: '99% Accuracy',
    description: 'Advanced sensors capture every micro-movement with sub-millimeter precision.',
  },
  {
    id: 'realtime',
    title: 'Real-Time Translation',
    subtitle: '<50ms Latency',
    description: 'Instant gesture-to-speech conversion powered by on-device neural processing.',
  },
  {
    id: 'design',
    title: 'Ergonomic Design',
    subtitle: 'All-Day Comfort',
    description: 'Ultra-lightweight at just 45g with breathable materials for extended wear.',
  },
  {
    id: 'cta',
    title: 'Join the Revolution',
    subtitle: 'Pre-Order Now',
    description: 'Be among the first to experience the future of accessible communication.',
  },
];

// Glove Model with scroll-driven animation - using window scroll
function GloveModel() {
  const { scene } = useGLTF('/models/smart_glove.glb');
  const modelRef = useRef<THREE.Group>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Clone and setup scene
  useEffect(() => {
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollTop / docHeight;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scene]);

  useFrame((state) => {
    if (!modelRef.current) return;

    const t = scrollProgress;

    // Rotate model based on scroll
    modelRef.current.rotation.y = t * Math.PI * 4;
    modelRef.current.rotation.x = Math.sin(t * Math.PI * 2) * 0.3;
    modelRef.current.rotation.z = Math.cos(t * Math.PI * 2) * 0.1;

    // Move model position based on scroll - shifted to right
    modelRef.current.position.x = 1.5 + Math.sin(t * Math.PI * 2) * 0.3;
    modelRef.current.position.y = Math.sin(t * Math.PI * 4) * 0.2;

    // Scale pulse
    const scale = 1 + Math.sin(t * Math.PI * 8) * 0.03;
    modelRef.current.scale.setScalar(scale * 2);

    // Add subtle floating animation
    modelRef.current.position.y += Math.sin(state.clock.elapsedTime * 2) * 0.02;
  });

  return (
    <Float speed={1.5} rotationIntensity={0.15} floatIntensity={0.4}>
      <primitive ref={modelRef} object={scene} scale={2} position={[1.5, 0, 0]} />
    </Float>
  );
}

// Camera that follows scroll - using window scroll
function ScrollCamera() {
  const { camera } = useThree();
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollTop / docHeight;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useFrame(() => {
    const t = scrollProgress;

    // Camera orbits smoothly
    camera.position.x = Math.sin(t * Math.PI) * 1;
    camera.position.y = 0.5 + Math.sin(t * Math.PI * 2) * 0.3;
    camera.position.z = 4 + Math.cos(t * Math.PI) * 1;

    camera.lookAt(1.5, 0, 0);
  });

  return null;
}

// Lighting
function Lighting() {
  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight
        position={[10, 10, 5]}
        intensity={1.5}
        castShadow
        shadow-mapSize={[2048, 2048]}
      />
      <directionalLight position={[-5, 5, -5]} intensity={0.8} color="#4ECDC4" />
      <pointLight position={[0, -5, 0]} intensity={0.5} color="#FFE66D" />
      <spotLight
        position={[0, 10, 0]}
        angle={0.3}
        penumbra={1}
        intensity={1}
        castShadow
        color="#ffffff"
      />
    </>
  );
}

// Loading component
function Loader() {
  return (
    <Html center>
      <div className="flex flex-col items-center gap-4">
        <div className="w-20 h-20 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
        <p className="text-foreground font-medium text-lg">Loading 3D Experience...</p>
      </div>
    </Html>
  );
}

// Scroll Content Overlay Component (outside Canvas)
function ScrollOverlay() {
  const [currentSection, setCurrentSection] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollTop / docHeight;
      setScrollProgress(progress);

      const sectionIndex = Math.min(
        Math.floor(progress * sections.length),
        sections.length - 1
      );
      setCurrentSection(sectionIndex);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Scroll Progress Bar */}
      <div
        className="fixed top-0 left-0 h-1 bg-primary z-50"
        style={{ width: `${scrollProgress * 100}%` }}
      />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-40 p-4 md:p-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-glow-sm">
              <span className="text-primary-foreground font-bold text-lg">V</span>
            </div>
            <span className="font-semibold text-lg text-foreground hidden sm:block">Voice of Silence</span>
          </div>
          <div className="hidden lg:flex items-center gap-8">
            {['Features', 'Technology', 'Specs', 'Contact'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="text-muted-foreground hover:text-foreground transition-colors font-medium">
                {item}
              </a>
            ))}
          </div>
          <button className="px-4 md:px-6 py-2 md:py-3 bg-primary text-primary-foreground rounded-xl font-semibold hover:shadow-glow transition-all text-sm md:text-base">
            Pre-Order
          </button>
        </div>
      </nav>

      {/* Section Content - Left Side */}
      <div className="fixed left-0 top-0 h-screen w-full md:w-1/2 flex items-center pointer-events-none z-30">
        <div className="px-6 md:px-12 lg:px-16 w-full">
          {sections.map((section, index) => (
            <div
              key={section.id}
              className={`absolute transition-all duration-700 max-w-lg ${currentSection === index
                ? 'opacity-100 translate-y-0'
                : currentSection > index
                  ? 'opacity-0 -translate-y-12'
                  : 'opacity-0 translate-y-12'
                }`}
            >
              <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4 md:mb-6 border border-primary/20">
                {section.subtitle}
              </span>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4 md:mb-6 leading-tight">
                {section.title.split(' ').map((word, i) => (
                  <span key={i} className="block md:inline">
                    {i === section.title.split(' ').length - 1 ? (
                      <span className="gradient-text">{word}</span>
                    ) : (
                      <>{word} </>
                    )}
                  </span>
                ))}
              </h1>
              <p className="text-base md:text-lg lg:text-xl text-muted-foreground leading-relaxed mb-6 md:mb-8">
                {section.description}
              </p>
              {index === 0 && (
                <div className="flex flex-col sm:flex-row gap-3 md:gap-4 pointer-events-auto">
                  <button className="px-6 md:px-8 py-3 md:py-4 bg-primary text-primary-foreground rounded-2xl font-semibold hover:shadow-glow hover:scale-105 transition-all">
                    Explore Features
                  </button>
                  <button className="px-6 md:px-8 py-3 md:py-4 bg-secondary text-secondary-foreground rounded-2xl font-semibold hover:bg-secondary/80 transition-all">
                    Watch Demo
                  </button>
                </div>
              )}
              {index === sections.length - 1 && (
                <div className="flex flex-col gap-4 pointer-events-auto">
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl md:text-4xl font-bold text-foreground">$299</span>
                    <span className="text-muted-foreground">Early Bird Price</span>
                  </div>
                  <button className="px-6 md:px-8 py-3 md:py-4 bg-primary text-primary-foreground rounded-2xl font-semibold hover:shadow-glow hover:scale-105 transition-all w-fit">
                    Pre-Order Now →
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Section Indicators - Right Side */}
      <div className="fixed right-4 md:right-8 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-40">
        {sections.map((section, index) => (
          <button
            key={section.id}
            onClick={() => {
              const docHeight = document.documentElement.scrollHeight - window.innerHeight;
              const targetScroll = (index / sections.length) * docHeight;
              window.scrollTo({ top: targetScroll, behavior: 'smooth' });
            }}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${currentSection === index
              ? 'bg-primary scale-150 shadow-glow-sm'
              : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
              }`}
            aria-label={`Go to ${section.title}`}
          />
        ))}
      </div>

      {/* Scroll Hint */}
      {scrollProgress < 0.05 && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground z-40">
          <span className="text-sm font-medium">Scroll to explore</span>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="animate-bounce">
            <path d="M12 5v14M19 12l-7 7-7-7" />
          </svg>
        </div>
      )}

      {/* Stats (visible on hero) */}
      {currentSection === 0 && (
        <div className="fixed bottom-8 left-6 md:left-12 lg:left-16 z-30">
          <div className="grid grid-cols-3 gap-4 md:gap-8">
            <div className="glass px-4 py-3 rounded-xl">
              <div className="text-xl md:text-2xl font-bold text-foreground font-mono">99%</div>
              <div className="text-xs md:text-sm text-muted-foreground">Accuracy</div>
            </div>
            <div className="glass px-4 py-3 rounded-xl">
              <div className="text-xl md:text-2xl font-bold text-foreground font-mono">&lt;50ms</div>
              <div className="text-xs md:text-sm text-muted-foreground">Latency</div>
            </div>
            <div className="glass px-4 py-3 rounded-xl">
              <div className="text-xl md:text-2xl font-bold text-foreground font-mono">200+</div>
              <div className="text-xs md:text-sm text-muted-foreground">Gestures</div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}



export function ScrollScene3D() {
  return (
    <>
      {/* Scrollable Content Area */}
      <div className="h-[500vh]" />

      {/* Fixed 3D Canvas */}
      <div className="fixed inset-0 w-full h-screen">
        <Canvas
          shadows
          dpr={[1, 2]}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: 'high-performance',
          }}
          camera={{ position: [0, 0.5, 5], fov: 45 }}
          style={{
            background: 'linear-gradient(135deg, hsl(150 25% 97%) 0%, hsl(174 30% 92%) 100%)'
          }}
        >
          <color attach="background" args={['#f0faf8']} />
          <fog attach="fog" args={['#f0faf8', 8, 25]} />

          <Suspense fallback={<Loader />}>
            <ScrollCamera />
            <GloveModel />
            <Lighting />
            <Environment preset="city" />
          </Suspense>
        </Canvas>
      </div>

      {/* UI Overlay */}
      <ScrollOverlay />
    </>
  );
}

useGLTF.preload('/models/smart_glove.glb');
