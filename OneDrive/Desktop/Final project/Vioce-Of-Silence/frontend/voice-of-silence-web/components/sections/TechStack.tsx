// path: components/sections/TechStack.tsx
'use client'

import { motion } from 'framer-motion'
import SectionTitle from '@/components/ui/SectionTitle'

const technologies = [
  { name: 'Next.js', category: 'Framework' },
  { name: 'React Three Fiber', category: '3D' },
  { name: 'TypeScript', category: 'Language' },
  { name: 'MongoDB', category: 'Database' },
  { name: 'TensorFlow', category: 'ML' },
  { name: 'WebSocket', category: 'Realtime' },
  { name: 'Tailwind CSS', category: 'Styling' },
  { name: 'Docker', category: 'DevOps' },
]

export default function TechStack() {
  return (
    <section className="py-20 md:py-32 bg-background/50" aria-label="Technology stack section">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle subtitle="Built with modern, scalable technologies">
          Technology Stack
        </SectionTitle>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {technologies.map((tech, index) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="bg-gradient-to-br from-background to-background/80 border border-gradient-cyan/30 rounded-lg p-6 text-center hover:border-gradient-cyan transition-colors"
            >
              <div className="text-2xl font-headline font-bold text-gradient mb-2">
                {tech.name}
              </div>
              <div className="text-sm text-gray-400">{tech.category}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
