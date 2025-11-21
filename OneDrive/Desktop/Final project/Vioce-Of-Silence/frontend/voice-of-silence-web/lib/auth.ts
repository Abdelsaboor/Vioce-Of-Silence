// path: lib/auth.ts
import { NextRequest } from 'next/server'

/**
 * Simple API key authentication middleware
 * 
 * Production alternatives:
 * - OAuth 2.0 with JWT tokens
 * - Auth0, Clerk, or NextAuth.js
 * - API Gateway with IAM roles (AWS)
 */

export function verifyApiKey(request: NextRequest): { valid: boolean; userId?: string } {
  const apiKey = request.headers.get('x-api-key')
  const expectedKey = process.env.API_KEY

  // In development, allow without key
  if (process.env.NODE_ENV === 'development' && !apiKey) {
    return { valid: true, userId: 'dev-user' }
  }

  if (!apiKey || !expectedKey) {
    return { valid: false }
  }

  // Simple comparison - use constant-time comparison in production
  if (apiKey === expectedKey) {
    return { valid: true, userId: 'api-user' }
  }

  return { valid: false }
}

/**
 * TODO: Implement JWT verification
 * 
 * import { verify } from 'jsonwebtoken'
 * 
 * export function verifyJWT(token: string) {
 *   try {
 *     const decoded = verify(token, process.env.JWT_SECRET!)
 *     return { valid: true, payload: decoded }
 *   } catch {
 *     return { valid: false }
 *   }
 * }
 */