import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Scene3D } from '@/components/3d/Scene3D';
import { Navigation } from '@/components/ui/Navigation';
import { SceneOverlay } from '@/components/ui/SceneOverlay';
import { ScrollProgress } from '@/components/ui/ScrollProgress';
import { Footer } from '@/components/ui/Footer';
import { ScrollContainer } from '@/components/ScrollContainer';
import { LoadingScreen } from '@/components/LoadingScreen';

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setLoadingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsLoading(false), 500);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 150);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* SEO */}
      <title>Voice of Silence | Cinematic 3D Product Launch</title>
      <meta name="description" content="Transform silence into action with Voice of Silence - the future of gesture recognition technology. Sub-millisecond response, 99.7% accuracy, complete privacy." />
      
      <AnimatePresence>
        {isLoading && <LoadingScreen progress={loadingProgress} />}
      </AnimatePresence>

      <main className="relative overflow-x-hidden bg-background">
        {/* 3D Scene - fixed background */}
        <Scene3D />
        
        {/* UI Overlays */}
        <Navigation />
        <SceneOverlay />
        <ScrollProgress />
        <Footer />
        
        {/* Scroll container for scroll progress */}
        <ScrollContainer>
          <div className="relative z-0" />
        </ScrollContainer>
      </main>
    </>
  );
};

export default Index;
