import { ArrowDown, Sparkles } from 'lucide-react';
import gloveHero from '@/assets/glove-hero.png';

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden section-gradient">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-primary/5 to-transparent rounded-full" />
      </div>

      {/* Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }}
      />

      <div className="container mx-auto px-6 pt-24 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left stagger-children">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-8">
              <Sparkles size={16} />
              <span>Revolutionary Gesture Technology</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground leading-tight mb-6 text-balance">
              The Future of{' '}
              <span className="gradient-text">Silent Communication</span>
            </h1>

            <p className="text-lg lg:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0 mb-10 leading-relaxed">
              Transform hand gestures into seamless communication with our cutting-edge 
              gesture recognition technology. Designed for accessibility, built for everyone.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <a
                href="#contact"
                className="group px-8 py-4 bg-primary text-primary-foreground rounded-2xl font-semibold transition-all duration-300 hover:shadow-glow hover:scale-105 flex items-center justify-center gap-2"
              >
                Pre-Order Now
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </a>
              <a
                href="#features"
                className="px-8 py-4 bg-secondary text-secondary-foreground rounded-2xl font-semibold transition-all duration-300 hover:bg-secondary/80 flex items-center justify-center"
              >
                Explore Features
              </a>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 mt-12 pt-12 border-t border-border/50">
              <div>
                <div className="text-3xl lg:text-4xl font-bold text-foreground counter">99%</div>
                <div className="text-sm text-muted-foreground mt-1">Accuracy Rate</div>
              </div>
              <div>
                <div className="text-3xl lg:text-4xl font-bold text-foreground counter">&lt;50ms</div>
                <div className="text-sm text-muted-foreground mt-1">Response Time</div>
              </div>
              <div>
                <div className="text-3xl lg:text-4xl font-bold text-foreground counter">200+</div>
                <div className="text-sm text-muted-foreground mt-1">Gestures</div>
              </div>
            </div>
          </div>

          {/* Right - Product Image */}
          <div className="relative flex items-center justify-center">
            <div className="relative animate-float">
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full scale-75" />
              
              {/* Product Image */}
              <img
                src={gloveHero}
                alt="Voice of Silence Smart Glove"
                className="relative w-full max-w-lg mx-auto drop-shadow-2xl"
              />

              {/* Floating Labels */}
              <div className="absolute top-10 -left-4 lg:-left-12 glass px-4 py-2 rounded-xl text-sm font-medium animate-fade-in-left" style={{ animationDelay: '0.5s' }}>
                <span className="text-primary">●</span> AI Powered
              </div>
              <div className="absolute bottom-20 -right-4 lg:-right-12 glass px-4 py-2 rounded-xl text-sm font-medium animate-fade-in-right" style={{ animationDelay: '0.7s' }}>
                <span className="text-accent">●</span> Real-time Translation
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground">
        <span className="text-sm font-medium">Scroll to explore</span>
        <ArrowDown size={20} className="animate-bounce" />
      </div>
    </section>
  );
}
