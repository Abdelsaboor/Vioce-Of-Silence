// path: components/sections/Features.tsx
'use client'

import { motion } from 'framer-motion'
import Card from '@/components/ui/Card'
import SectionTitle from '@/components/ui/SectionTitle'
import { t } from '@/lib/i18n'

const features = [
  {
    titleKey: 'realtime.title',
    descriptionKey: 'realtime.description',
    icon: '⚡',
  },
  {
    titleKey: 'accurate.title',
    descriptionKey: 'accurate.description',
    icon: '🎯',
  },
  {
    titleKey: 'accessible.title',
    descriptionKey: 'accessible.description',
    icon: '♿',
  },
]

export default function Features() {
  return (
    <section
      id="features"
      className="py-20 md:py-32"
      aria-label="Features section"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle subtitle="Discover what makes our technology unique">
          {t('features.title')}
        </SectionTitle>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.titleKey}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.5 }}
            >
              <Card>
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="text-2xl font-headline font-bold text-gradient mb-4">
                  {t(`features.${feature.titleKey}`)}
                </h3>
                <p className="text-gray-300">
                  {t(`features.${feature.descriptionKey}`)}
                </p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
