// path: lib/middleware.ts
import { NextRequest } from 'next/server'

// Simple in-memory rate limiter (use Redis for production)
interface RateLimitStore {
  [key: string]: {
    count: number
    resetTime: number
  }
}

const rateLimitStore: RateLimitStore = {}
const RATE_LIMIT_WINDOW = parseInt(process.env.RATE_LIMIT_WINDOW_MS || '60000')
const RATE_LIMIT_MAX = parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100')

/**
 * Simple rate limiting middleware
 * For production, use Redis or a dedicated service like Upstash
 */
export async function rateLimit(request: NextRequest): Promise<{ allowed: boolean; remaining: number }> {
  if (process.env.ENABLE_RATE_LIMITING !== 'true') {
    return { allowed: true, remaining: Infinity }
  }

  const ip = request.ip || request.headers.get('x-forwarded-for') || 'unknown'
  const now = Date.now()
  const key = `rate_limit_${ip}`

  const record = rateLimitStore[key]

  if (!record || now > record.resetTime) {
    rateLimitStore[key] = {
      count: 1,
      resetTime: now + RATE_LIMIT_WINDOW,
    }
    return { allowed: true, remaining: RATE_LIMIT_MAX - 1 }
  }

  if (record.count >= RATE_LIMIT_MAX) {
    return { allowed: false, remaining: 0 }
  }

  record.count++
  return { allowed: true, remaining: RATE_LIMIT_MAX - record.count }
}

/**
 * Validate API key from request header
 * For production, use JWT or OAuth 2.0
 */
export function validateApiKey(apiKey: string | null): boolean {
  const validApiKey = process.env.API_KEY
  
  if (!validApiKey) {
    // If no API key is set, allow all requests (development only)
    if (process.env.NODE_ENV === 'development') {
      return true
    }
    return false
  }

  return apiKey === validApiKey
}

/**
 * Clean up expired rate limit records (call periodically)
 */
export function cleanupRateLimitStore() {
  const now = Date.now()
  Object.keys(rateLimitStore).forEach(key => {
    if (rateLimitStore[key].resetTime < now) {
      delete rateLimitStore[key]
    }
  })
}

// Cleanup every 5 minutes
if (typeof setInterval !== 'undefined') {
  setInterval(cleanupRateLimitStore, 5 * 60 * 1000)
}

