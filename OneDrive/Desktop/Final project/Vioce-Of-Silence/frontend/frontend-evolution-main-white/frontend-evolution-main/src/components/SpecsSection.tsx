import { useEffect, useRef, useState } from 'react';

interface CounterProps {
  end: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
}

function Counter({ end, suffix = '', prefix = '', duration = 2000 }: CounterProps) {
  const [count, setCount] = useState(0);
  const countRef = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          let start = 0;
          const step = end / (duration / 16);
          const timer = setInterval(() => {
            start += step;
            if (start >= end) {
              setCount(end);
              clearInterval(timer);
            } else {
              setCount(Math.floor(start));
            }
          }, 16);
          return () => clearInterval(timer);
        }
      },
      { threshold: 0.5 }
    );

    if (countRef.current) {
      observer.observe(countRef.current);
    }

    return () => observer.disconnect();
  }, [end, duration, hasAnimated]);

  return (
    <span ref={countRef} className="counter">
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  );
}

const specs = [
  { value: 99, suffix: '%', label: 'Recognition Accuracy' },
  { value: 50, prefix: '<', suffix: 'ms', label: 'Response Latency' },
  { value: 200, suffix: '+', label: 'Supported Gestures' },
  { value: 18, suffix: 'hrs', label: 'Battery Life' },
  { value: 45, suffix: 'g', label: 'Ultra-Light Weight' },
  { value: 5, suffix: '.0', label: 'Bluetooth Version' },
];

const techSpecs = [
  { label: 'Processor', value: 'Neural Engine NPU' },
  { label: 'Memory', value: '4GB LPDDR5' },
  { label: 'Storage', value: '32GB Flash' },
  { label: 'Connectivity', value: 'BT 5.0, WiFi 6' },
  { label: 'Charging', value: 'USB-C, Wireless Qi' },
  { label: 'Water Resistance', value: 'IP67 Rated' },
];

export function SpecsSection() {
  return (
    <section id="specs" className="section bg-card relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/5 blur-3xl rounded-full" />

      <div className="container mx-auto px-6 relative">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            Specifications
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Engineered for{' '}
            <span className="gradient-text">Excellence</span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Every detail meticulously designed for the perfect balance of 
            performance, comfort, and reliability.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-20">
          {specs.map((spec) => (
            <div
              key={spec.label}
              className="text-center p-6 rounded-2xl bg-background border border-border/50 card-hover"
            >
              <div className="text-3xl lg:text-4xl font-bold text-primary mb-2">
                <Counter 
                  end={spec.value} 
                  suffix={spec.suffix} 
                  prefix={spec.prefix}
                />
              </div>
              <div className="text-sm text-muted-foreground">{spec.label}</div>
            </div>
          ))}
        </div>

        {/* Technical Specs Table */}
        <div className="max-w-3xl mx-auto">
          <h3 className="text-2xl font-semibold text-foreground mb-8 text-center">
            Technical Details
          </h3>
          <div className="grid gap-4">
            {techSpecs.map((spec, index) => (
              <div
                key={spec.label}
                className="flex items-center justify-between p-4 rounded-xl bg-background border border-border/50 hover:border-primary/30 transition-colors duration-300"
              >
                <span className="text-muted-foreground">{spec.label}</span>
                <span className="font-semibold text-foreground font-mono">{spec.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
