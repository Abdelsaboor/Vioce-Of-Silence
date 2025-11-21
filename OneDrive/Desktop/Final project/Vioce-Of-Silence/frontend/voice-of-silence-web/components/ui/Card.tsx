// path: components/ui/Card.tsx
'use client'

import { ReactNode } from 'react'
import { motion } from 'framer-motion'

interface CardProps {
  children: ReactNode
  className?: string
  hover?: boolean
}

export default function Card({ children, className = '', hover = true }: CardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={hover ? { scale: 1.05, y: -5 } : {}}
      className={`bg-gradient-to-br from-background to-background/80 backdrop-blur-sm border border-gradient-cyan/30 rounded-xl p-6 shadow-lg ${className}`}
    >
      {children}
    </motion.div>
  )
}
