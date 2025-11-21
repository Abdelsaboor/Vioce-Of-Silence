// path: components/ui/SectionTitle.tsx
'use client'

import { ReactNode } from 'react'
import { motion } from 'framer-motion'

interface SectionTitleProps {
  children: ReactNode
  subtitle?: string
  className?: string
}

export default function SectionTitle({ children, subtitle, className = '' }: SectionTitleProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={`text-center mb-12 ${className}`}
    >
      <h2 className="text-4xl md:text-5xl font-headline font-bold text-gradient mb-4">
        {children}
      </h2>
      {subtitle && (
        <p className="text-lg text-gray-400 max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
    </motion.div>
  )
}
