// path: lib/i18n.ts

/**
 * Internationalization (i18n) Module
 * 
 * Simple i18n implementation for multi-language support
 * For production, consider using next-intl or react-i18next
 */

export type Language = 'en' | 'es' | 'fr' | 'de'

interface Translations {
  [key: string]: string | Translations
}

const translations: Record<Language, Translations> = {
  en: {
    nav: {
      home: 'Home',
      features: 'Features',
      howItWorks: 'How It Works',
      contact: 'Contact',
    },
    hero: {
      title: 'Voice of Silence',
      subtitle: 'Transform gestures into speech',
      description: 'Revolutionary smart glove technology that recognizes sign language gestures and converts them to text and speech in real-time.',
      cta: 'Get Started',
      demo: 'Try Demo',
    },
    features: {
      title: 'Features',
      realtime: {
        title: 'Real-time Recognition',
        description: 'Instant gesture recognition with low latency',
      },
      accurate: {
        title: 'High Accuracy',
        description: 'Advanced ML models for precise gesture detection',
      },
      accessible: {
        title: 'Accessible',
        description: 'Making communication accessible for everyone',
      },
    },
    howItWorks: {
      title: 'How It Works',
      step1: {
        title: 'Wear the Glove',
        description: 'Put on the smart glove with integrated sensors',
      },
      step2: {
        title: 'Perform Gesture',
        description: 'Make a sign language gesture',
      },
      step3: {
        title: 'Get Translation',
        description: 'Receive instant text and speech translation',
      },
    },
    footer: {
      copyright: '© 2024 Voice of Silence. All rights reserved.',
    },
  },
  es: {
    nav: {
      home: 'Inicio',
      features: 'Características',
      howItWorks: 'Cómo Funciona',
      contact: 'Contacto',
    },
    hero: {
      title: 'Voz del Silencio',
      subtitle: 'Transforma gestos en voz',
      description: 'Tecnología revolucionaria de guante inteligente que reconoce gestos del lenguaje de señas y los convierte en texto y voz en tiempo real.',
      cta: 'Comenzar',
      demo: 'Probar Demo',
    },
    features: {
      title: 'Características',
      realtime: {
        title: 'Reconocimiento en Tiempo Real',
        description: 'Reconocimiento instantáneo de gestos con baja latencia',
      },
      accurate: {
        title: 'Alta Precisión',
        description: 'Modelos de ML avanzados para detección precisa de gestos',
      },
      accessible: {
        title: 'Accesible',
        description: 'Haciendo la comunicación accesible para todos',
      },
    },
    howItWorks: {
      title: 'Cómo Funciona',
      step1: {
        title: 'Usa el Guante',
        description: 'Ponte el guante inteligente con sensores integrados',
      },
      step2: {
        title: 'Realiza un Gesto',
        description: 'Haz un gesto del lenguaje de señas',
      },
      step3: {
        title: 'Obtén la Traducción',
        description: 'Recibe traducción instantánea en texto y voz',
      },
    },
    footer: {
      copyright: '© 2024 Voz del Silencio. Todos los derechos reservados.',
    },
  },
  fr: {
    nav: {
      home: 'Accueil',
      features: 'Fonctionnalités',
      howItWorks: 'Comment ça marche',
      contact: 'Contact',
    },
    hero: {
      title: 'Voix du Silence',
      subtitle: 'Transformez les gestes en parole',
      description: 'Technologie révolutionnaire de gant intelligent qui reconnaît les gestes de la langue des signes et les convertit en texte et en parole en temps réel.',
      cta: 'Commencer',
      demo: 'Essayer la démo',
    },
    features: {
      title: 'Fonctionnalités',
      realtime: {
        title: 'Reconnaissance en temps réel',
        description: 'Reconnaissance instantanée des gestes avec faible latence',
      },
      accurate: {
        title: 'Haute précision',
        description: 'Modèles ML avancés pour la détection précise des gestes',
      },
      accessible: {
        title: 'Accessible',
        description: 'Rendre la communication accessible à tous',
      },
    },
    howItWorks: {
      title: 'Comment ça marche',
      step1: {
        title: 'Portez le Gant',
        description: 'Enfilez le gant intelligent avec des capteurs intégrés',
      },
      step2: {
        title: 'Effectuez un Geste',
        description: 'Faites un geste de langue des signes',
      },
      step3: {
        title: 'Obtenez la Traduction',
        description: 'Recevez une traduction instantanée en texte et en parole',
      },
    },
    footer: {
      copyright: '© 2024 Voix du Silence. Tous droits réservés.',
    },
  },
  de: {
    nav: {
      home: 'Startseite',
      features: 'Funktionen',
      howItWorks: 'Wie es funktioniert',
      contact: 'Kontakt',
    },
    hero: {
      title: 'Stimme der Stille',
      subtitle: 'Verwandeln Sie Gesten in Sprache',
      description: 'Revolutionäre Smart-Handschuh-Technologie, die Gebärdensprachgesten erkennt und sie in Echtzeit in Text und Sprache umwandelt.',
      cta: 'Loslegen',
      demo: 'Demo ausprobieren',
    },
    features: {
      title: 'Funktionen',
      realtime: {
        title: 'Echtzeit-Erkennung',
        description: 'Sofortige Gestenerkennung mit niedriger Latenz',
      },
      accurate: {
        title: 'Hohe Genauigkeit',
        description: 'Fortschrittliche ML-Modelle zur präzisen Gestenerkennung',
      },
      accessible: {
        title: 'Zugänglich',
        description: 'Kommunikation für alle zugänglich machen',
      },
    },
    howItWorks: {
      title: 'Wie es funktioniert',
      step1: {
        title: 'Handschuh tragen',
        description: 'Ziehen Sie den Smart-Handschuh mit integrierten Sensoren an',
      },
      step2: {
        title: 'Geste ausführen',
        description: 'Machen Sie eine Gebärdensprachgeste',
      },
      step3: {
        title: 'Übersetzung erhalten',
        description: 'Erhalten Sie eine sofortige Text- und Sprachübersetzung',
      },
    },
    footer: {
      copyright: '© 2024 Stimme der Stille. Alle Rechte vorbehalten.',
    },
  },
}

let currentLanguage: Language = 'en'

/**
 * Set current language
 */
export function setLanguage(lang: Language): void {
  currentLanguage = lang
  if (typeof window !== 'undefined') {
    localStorage.setItem('language', lang)
  }
}

/**
 * Get current language
 */
export function getLanguage(): Language {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('language') as Language
    if (stored && translations[stored]) {
      return stored
    }
  }
  return currentLanguage
}

/**
 * Get translation for a key
 */
export function t(key: string): string {
  const lang = getLanguage()
  const keys = key.split('.')
  let value: unknown = translations[lang]

  for (const k of keys) {
    if (typeof value === 'object' && value !== null && k in value) {
      value = value[k as keyof typeof value]
    } else {
      // Fallback to English if translation not found
      value = translations.en
      for (const k2 of keys) {
        if (typeof value === 'object' && value !== null && k2 in value) {
          value = value[k2 as keyof typeof value]
        } else {
          return key
        }
      }
      break
    }
  }

  return typeof value === 'string' ? value : key
}

/**
 * Initialize i18n (load from localStorage)
 */
export function initI18n(): void {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('language') as Language
    if (stored && translations[stored]) {
      currentLanguage = stored
    } else {
      // Detect browser language
      const browserLang = navigator.language.split('-')[0] as Language
      if (translations[browserLang]) {
        currentLanguage = browserLang
      }
    }
  }
}
