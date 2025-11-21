// path: app/layout.tsx
import type { Metadata } from 'next'
import { Orbitron, Exo_2 } from 'next/font/google'
import './globals.css'

const orbitron = Orbitron({
  subsets: ['latin'],
  variable: '--font-orbitron',
  display: 'swap',
})

const exo2 = Exo_2({
  subsets: ['latin'],
  variable: '--font-exo2',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Voice of Silence - Smart Glove Gesture Recognition',
  description: 'Interactive 3D web application for smart-glove sensor data, gesture recognition, and text-to-speech translation',
  keywords: ['gesture recognition', 'smart glove', 'sign language', 'accessibility'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${orbitron.variable} ${exo2.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  )
}
