// path: __tests__/api/gestures.test.ts
import { POST } from '@/app/api/gestures/route'
import { NextRequest } from 'next/server'

// Mock dependencies
jest.mock('@/lib/db', () => ({
  saveGestureRecord: jest.fn().mockResolvedValue(undefined)
}))

describe('Gestures API', () => {
  it('returns 401 without valid API key in production', async () => {
    const originalEnv = process.env.NODE_ENV
    process.env.NODE_ENV = 'production'

    const request = new NextRequest('http://localhost:3000/api/gestures', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        deviceId: 'test',
        timestamp: Date.now()
      })
    })

    const response = await POST(request)
    expect(response.status).toBe(401)

    process.env.NODE_ENV = originalEnv
  })

  it('returns 400 for invalid payload', async () => {
    const request = new NextRequest('http://localhost:3000/api/gestures', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'x-api-key': 'test-key'
      },
      body: JSON.stringify({
        // Missing required fields
        invalidField: 'value'
      })
    })

    const response = await POST(request)
    expect(response.status).toBe(400)
  })

  it('returns prediction for valid payload in development', async () => {
    process.env.NODE_ENV = 'development'

    const request = new NextRequest('http://localhost:3000/api/gestures', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        deviceId: 'test-device',
        timestamp: Date.now(),
        features: { flex1: 0.5 }
      })
    })

    const response = await POST(request)
    expect(response.status).toBe(200)

    const data = await response.json()
    expect(data).toHaveProperty('label')
    expect(data).toHaveProperty('confidence')
    expect(data).toHaveProperty('ts')
  })
})