// path: components/sections/Hero.tsx
'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Button from '@/components/ui/Button'
import Scene from '@/components/3d/Scene'
import { t, initI18n } from '@/lib/i18n'
import { speakText } from '@/lib/speechSynthesis'

export default function Hero() {
  const [isClient, setIsClient] = useState(false)
  const [isDemoRunning, setIsDemoRunning] = useState(false)

  useEffect(() => {
    setIsClient(true)
    initI18n()
  }, [])

  const handleDemo = async () => {
    setIsDemoRunning(true)
    
    // Simulate gesture recognition
    try {
      const response = await fetch('/api/gestures', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Note: In production, API key should be stored securely
          // For demo purposes, we'll let the backend handle auth in dev mode
        },
        body: JSON.stringify({
          deviceId: 'demo-device',
          timestamp: Date.now(),
          sequence: Array.from({ length: 10 }, () => 
            Array.from({ length: 10 }, () => Math.random())
          ),
          features: { demo: true },
        }),
      })

      if (!response.ok) {
        throw new Error(`API error: ${response.statusText}`)
      }

      const result = await response.json()
      
      if (result.label) {
        // Speak the recognized gesture
        await speakText(result.label, { language: 'en-US' })
      }
    } catch (error) {
      console.error('Demo error:', error)
      // Show user-friendly error message
      alert('Demo failed. Please check the console for details.')
    } finally {
      setIsDemoRunning(false)
    }
  }

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20"
      aria-label="Hero section"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-background/80 z-0" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(122,61,255,0.1),transparent)] z-0" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            <motion.h1
              className="text-5xl md:text-6xl lg:text-7xl font-headline font-bold text-gradient mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              {t('hero.title')}
            </motion.h1>
            
            <motion.p
              className="text-xl md:text-2xl text-gradient-cyan mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              {t('hero.subtitle')}
            </motion.p>
            
            <motion.p
              className="text-gray-300 text-lg mb-8 max-w-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              {t('hero.description')}
            </motion.p>
            
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
            >
              <Button
                variant="primary"
                size="lg"
                onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
              >
                {t('hero.cta')}
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={handleDemo}
                isLoading={isDemoRunning}
                disabled={!isClient || isDemoRunning}
              >
                {t('hero.demo')}
              </Button>
            </motion.div>
          </motion.div>

          {/* 3D Model */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="h-[500px] lg:h-[600px] relative"
            aria-label="3D glove model visualization"
          >
            {isClient && <Scene />}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
