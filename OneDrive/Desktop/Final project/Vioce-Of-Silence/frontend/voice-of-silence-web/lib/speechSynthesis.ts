// path: lib/speechSynthesis.ts

/**
 * Text-to-Speech Module
 * 
 * Provides client-side and server-side TTS functionality
 * 
 * Client-side: Uses Web Speech API
 * Server-side: Placeholder for cloud TTS services (Google Cloud TTS, AWS Polly)
 */

export interface TTSOptions {
  language?: string
  rate?: number
  pitch?: number
  volume?: number
  voice?: string
}

/**
 * Client-side TTS using Web Speech API
 * Falls back gracefully if not supported
 */
export function speakText(
  text: string,
  options: TTSOptions = {}
): Promise<void> {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined' || !window.speechSynthesis) {
      console.warn('Speech synthesis not supported in this browser')
      reject(new Error('Speech synthesis not supported'))
      return
    }

    const utterance = new SpeechSynthesisUtterance(text)
    
    // Set options
    utterance.lang = options.language || 'en-US'
    utterance.rate = options.rate || 1.0
    utterance.pitch = options.pitch || 1.0
    utterance.volume = options.volume || 1.0

    // Try to set voice if specified
    if (options.voice) {
      const voices = window.speechSynthesis.getVoices()
      const voice = voices.find(v => v.name === options.voice)
      if (voice) {
        utterance.voice = voice
      }
    }

    utterance.onend = () => resolve()
    utterance.onerror = (error) => reject(error)

    window.speechSynthesis.speak(utterance)
  })
}

/**
 * Get available voices
 */
export function getVoices(): SpeechSynthesisVoice[] {
  if (typeof window === 'undefined' || !window.speechSynthesis) {
    return []
  }

  return window.speechSynthesis.getVoices()
}

/**
 * Stop current speech
 */
export function stopSpeech(): void {
  if (typeof window !== 'undefined' && window.speechSynthesis) {
    window.speechSynthesis.cancel()
  }
}

/**
 * Server-side TTS placeholder
 * Replace with your preferred TTS service:
 * - Google Cloud Text-to-Speech
 * - AWS Polly
 * - Azure Cognitive Services
 * - OpenAI TTS
 */
export async function synthesizeSpeechServer(
  text: string,
  options: TTSOptions = {}
): Promise<Buffer> {
  // Example: Google Cloud TTS
  /*
  import { TextToSpeechClient } from '@google-cloud/text-to-speech'
  
  const client = new TextToSpeechClient()
  const request = {
    input: { text },
    voice: {
      languageCode: options.language || 'en-US',
      name: options.voice || 'en-US-Wavenet-D',
    },
    audioConfig: {
      audioEncoding: 'MP3' as const,
    },
  }

  const [response] = await client.synthesizeSpeech(request)
  return response.audioContent as Buffer
  */

  // Example: AWS Polly
  /*
  import { PollyClient, SynthesizeSpeechCommand } from '@aws-sdk/client-polly'
  
  const client = new PollyClient({ region: 'us-east-1' })
  const command = new SynthesizeSpeechCommand({
    Text: text,
    OutputFormat: 'mp3',
    VoiceId: options.voice || 'Joanna',
    LanguageCode: options.language || 'en-US',
  })

  const response = await client.send(command)
  const buffer = Buffer.from(await response.AudioStream.transformToByteArray())
  return buffer
  */

  // Placeholder: return empty buffer
  console.warn('Server-side TTS not implemented')
  return Buffer.from('')
}

/**
 * Language code mapping for common languages
 */
export const LANGUAGE_CODES: Record<string, string> = {
  English: 'en-US',
  Spanish: 'es-ES',
  French: 'fr-FR',
  German: 'de-DE',
  Italian: 'it-IT',
  Portuguese: 'pt-BR',
  Japanese: 'ja-JP',
  Chinese: 'zh-CN',
  Korean: 'ko-KR',
  Arabic: 'ar-SA',
  Russian: 'ru-RU',
}
