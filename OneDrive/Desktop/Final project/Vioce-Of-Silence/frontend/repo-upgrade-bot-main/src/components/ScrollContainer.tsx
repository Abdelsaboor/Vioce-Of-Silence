import { useEffect, useRef, useCallback } from 'react';
import { useScrollStore } from '@/stores/useScrollStore';

interface ScrollContainerProps {
  children: React.ReactNode;
}

export const ScrollContainer = ({ children }: ScrollContainerProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const setScrollProgress = useScrollStore((state) => state.setScrollProgress);

  const handleScroll = useCallback(() => {
    if (!containerRef.current) return;
    
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = Math.min(Math.max(scrollTop / docHeight, 0), 1);
    
    setScrollProgress(progress);
  }, [setScrollProgress]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial call
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return (
    <div ref={containerRef} className="relative">
      {children}
      {/* Scroll spacer - 5 sections * 100vh each */}
      <div className="h-[500vh]" />
    </div>
  );
};
