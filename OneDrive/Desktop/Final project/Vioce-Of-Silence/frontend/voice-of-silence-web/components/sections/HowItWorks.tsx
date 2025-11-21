// path: components/sections/HowItWorks.tsx
'use client'

import { motion } from 'framer-motion'
import Card from '@/components/ui/Card'
import SectionTitle from '@/components/ui/SectionTitle'
import { t } from '@/lib/i18n'

const steps = [
  {
    number: '01',
    titleKey: 'step1.title',
    descriptionKey: 'step1.description',
    icon: '🖐️',
  },
  {
    number: '02',
    titleKey: 'step2.title',
    descriptionKey: 'step2.description',
    icon: '👋',
  },
  {
    number: '03',
    titleKey: 'step3.title',
    descriptionKey: 'step3.description',
    icon: '🗣️',
  },
]

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="py-20 md:py-32 bg-background/50"
      aria-label="How it works section"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle>{t('howItWorks.title')}</SectionTitle>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
            >
              <Card className="text-center h-full">
                <div className="text-6xl mb-4">{step.icon}</div>
                <div className="text-gradient-cyan text-4xl font-headline font-bold mb-4">
                  {step.number}
                </div>
                <h3 className="text-2xl font-headline font-bold text-white mb-4">
                  {t(`howItWorks.${step.titleKey}`)}
                </h3>
                <p className="text-gray-300">
                  {t(`howItWorks.${step.descriptionKey}`)}
                </p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
