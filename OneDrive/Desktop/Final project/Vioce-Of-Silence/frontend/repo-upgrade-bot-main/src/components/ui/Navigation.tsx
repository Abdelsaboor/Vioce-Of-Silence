import { motion } from 'framer-motion';
import { useScrollStore } from '@/stores/useScrollStore';
import { ThemeToggle } from './ThemeToggle';

export const Navigation = () => {
  const scrollProgress = useScrollStore((state) => state.scrollProgress);

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 px-6 py-4"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <motion.div
          className="flex items-center gap-2"
          whileHover={{ scale: 1.05 }}
        >
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
            <span className="text-primary-foreground font-display font-bold text-lg">V</span>
          </div>
          <span className="font-display font-semibold text-lg text-foreground">
            Voice of Silence
          </span>
        </motion.div>

        {/* Progress indicator */}
        <div className="hidden md:flex items-center gap-4">
          <div className="flex gap-2">
            {[0, 1, 2, 3, 4].map((i) => (
              <motion.div
                key={i}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${scrollProgress >= i * 0.2
                  ? 'bg-primary glow-primary'
                  : 'bg-muted'
                  }`}
                whileHover={{ scale: 1.5 }}
              />
            ))}
          </div>
          <span className="text-sm text-muted-foreground font-mono">
            {Math.round(scrollProgress * 100)}%
          </span>
        </div>

        {/* Right side: Theme toggle + CTA */}
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="glass px-6 py-2 rounded-full text-sm font-medium text-foreground hover:bg-primary/10 transition-colors"
          >
            Get Early Access
          </motion.button>
        </div>
      </div>
    </motion.nav>
  );
};
