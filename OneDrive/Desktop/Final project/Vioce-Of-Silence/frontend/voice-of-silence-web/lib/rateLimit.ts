// path: lib/rateLimit.ts

/**
 * Simple in-memory rate limiter
 * 
 * Production alternatives:
 * - Redis with sliding window
 * - API Gateway rate limiting
 * - Nginx rate limiting
 * - Cloudflare rate limiting
 */

interface RateLimitStore {
  [key: string]: {
    count: number;
    resetTime: number;
  }
}

const store: RateLimitStore = {}

const MAX_REQUESTS = parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100', 10)
const WINDOW_MS = parseInt(process.env.RATE_LIMIT_WINDOW_MS || '60000', 10)

export function checkRateLimit(clientId: string): {
  allowed: boolean;
  remaining: number;
  retryAfter?: number;
} {
  const now = Date.now()
  const clientData = store[clientId]

  // Clean up old entries periodically
  if (Math.random() < 0.01) {
    Object.keys(store).forEach(key => {
      if (store[key].resetTime < now) {
        delete store[key]
      }
    })
  }

  if (!clientData || clientData.resetTime < now) {
    store[clientId] = {
      count: 1,
      resetTime: now + WINDOW_MS
    }
    return { allowed: true, remaining: MAX_REQUESTS - 1 }
  }

  if (clientData.count >= MAX_REQUESTS) {
    const retryAfter = Math.ceil((clientData.resetTime - now) / 1000)
    return { allowed: false, remaining: 0, retryAfter }
  }

  clientData.count++
  return { allowed: true, remaining: MAX_REQUESTS - clientData.count }
}