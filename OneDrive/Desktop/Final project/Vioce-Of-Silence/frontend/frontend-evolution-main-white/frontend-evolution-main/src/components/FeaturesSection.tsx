import { Hand, Zap, Shield, Wifi, Battery, Cpu } from 'lucide-react';
import { cn } from '@/lib/utils';

const features = [
  {
    icon: Hand,
    title: 'Advanced Gesture Recognition',
    description: 'Recognizes over 200 unique hand gestures with 99% accuracy using machine learning algorithms.',
    color: 'primary',
  },
  {
    icon: Zap,
    title: 'Real-time Translation',
    description: 'Instantly converts sign language to text and speech with less than 50ms latency.',
    color: 'accent',
  },
  {
    icon: Shield,
    title: 'Privacy First',
    description: 'All processing happens on-device. Your data never leaves the glove.',
    color: 'primary',
  },
  {
    icon: Wifi,
    title: 'Seamless Connectivity',
    description: 'Connect to any device via Bluetooth 5.0 or WiFi for instant pairing.',
    color: 'accent',
  },
  {
    icon: Battery,
    title: 'All-Day Battery',
    description: '18+ hours of continuous use on a single charge with fast charging support.',
    color: 'primary',
  },
  {
    icon: Cpu,
    title: 'Edge AI Processing',
    description: 'Powerful on-board neural engine for offline operation and instant response.',
    color: 'accent',
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="section bg-card relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--foreground)) 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}
        />
      </div>

      <div className="container mx-auto px-6 relative">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            Features
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Technology That Speaks{' '}
            <span className="gradient-text">For You</span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Packed with cutting-edge technology designed to make communication 
            effortless and accessible for everyone.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className={cn(
                'group relative p-8 rounded-3xl bg-background border border-border/50 card-hover',
                'hover:border-primary/30'
              )}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Icon */}
              <div 
                className={cn(
                  'w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110',
                  feature.color === 'primary' 
                    ? 'bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground' 
                    : 'bg-accent/30 text-accent-foreground group-hover:bg-accent'
                )}
              >
                <feature.icon size={28} />
              </div>

              {/* Content */}
              <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>

              {/* Hover Gradient */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
