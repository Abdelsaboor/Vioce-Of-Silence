// path: components/sections/Footer.tsx
'use client'

import { t } from '@/lib/i18n'

export default function Footer() {
  return (
    <footer
      id="contact"
      className="py-12 border-t border-gradient-cyan/30"
      role="contentinfo"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-2xl font-headline font-bold text-gradient mb-4">
              Voice of Silence
            </h3>
            <p className="text-gray-400">
              Transforming gestures into speech through innovative technology.
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-headline font-bold text-white mb-4">Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="#home" className="text-gray-400 hover:text-gradient-cyan transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#features" className="text-gray-400 hover:text-gradient-cyan transition-colors">
                  Features
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="text-gray-400 hover:text-gradient-cyan transition-colors">
                  How It Works
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-headline font-bold text-white mb-4">Contact</h4>
            <p className="text-gray-400">
              For inquiries and support, please reach out through our channels.
            </p>
          </div>
        </div>
        
        <div className="text-center text-gray-400 border-t border-gradient-cyan/30 pt-8">
          <p>{t('footer.copyright')}</p>
        </div>
      </div>
    </footer>
  )
}
