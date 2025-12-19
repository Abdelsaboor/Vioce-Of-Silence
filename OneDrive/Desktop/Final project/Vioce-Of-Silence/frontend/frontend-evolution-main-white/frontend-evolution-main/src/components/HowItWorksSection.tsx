import { cn } from '@/lib/utils';

const steps = [
  {
    number: '01',
    title: 'Wear the Glove',
    description: 'Simply put on the lightweight, ergonomic glove. It automatically calibrates to your hand size.',
    visual: '🖐️',
  },
  {
    number: '02',
    title: 'Make Gestures',
    description: 'Express yourself using natural sign language or custom gestures. The glove tracks every movement.',
    visual: '✋',
  },
  {
    number: '03',
    title: 'AI Interprets',
    description: 'Our advanced neural engine processes your gestures in real-time with 99% accuracy.',
    visual: '🧠',
  },
  {
    number: '04',
    title: 'Communicate',
    description: 'Your gestures are instantly converted to text or speech on any connected device.',
    visual: '💬',
  },
];

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="section section-gradient relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-1/2 left-0 w-1/2 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      <div className="absolute top-1/2 right-0 w-1/2 h-px bg-gradient-to-l from-transparent via-border to-transparent" />

      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            How It Works
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Simple Steps to{' '}
            <span className="gradient-text">Silent Speech</span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Get started in minutes. No complex setup, no learning curve.
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connection Line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-border to-transparent -translate-y-1/2" />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
            {steps.map((step, index) => (
              <div
                key={step.number}
                className={cn(
                  'relative group'
                )}
              >
                {/* Card */}
                <div className="relative p-8 rounded-3xl bg-card border border-border/50 card-hover text-center h-full">
                  {/* Number Badge */}
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-primary text-primary-foreground font-mono font-bold text-sm">
                    {step.number}
                  </div>

                  {/* Visual */}
                  <div className="text-6xl mb-6 mt-4 transition-transform duration-300 group-hover:scale-110">
                    {step.visual}
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Arrow (hidden on last item) */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 text-border text-2xl -translate-y-1/2 z-10">
                    →
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-2xl font-semibold transition-all duration-300 hover:shadow-glow hover:scale-105"
          >
            Get Started Today
            <span>→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
