// path: tests/app/api/gestures/route.test.ts
import { POST } from '@/app/api/gestures/route'
import { NextRequest } from 'next/server'

// Mock the dependencies
jest.mock('@/lib/mlInference', () => ({
  predictGesture: jest.fn().mockResolvedValue({
    label: 'Hello',
    confidence: 0.95,
  }),
}))

jest.mock('@/lib/db', () => ({
  saveGestureRecord: jest.fn().mockResolvedValue(undefined),
}))

jest.mock('@/lib/middleware', () => ({
  validateApiKey: jest.fn().mockReturnValue(true),
  rateLimit: jest.fn().mockResolvedValue({ allowed: true, remaining: 99 }),
}))

describe('POST /api/gestures', () => {
  beforeEach(() => {
    process.env.ENABLE_DB_STORAGE = 'true'
    process.env.API_KEY = 'test-api-key'
  })

  it('should return 200 with prediction for valid request', async () => {
    const request = new NextRequest('http://localhost:3000/api/gestures', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': 'test-api-key',
      },
      body: JSON.stringify({
        deviceId: 'test-device',
        timestamp: Date.now(),
        sequence: [[1, 2, 3]],
        features: {},
      }),
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data).toHaveProperty('label')
    expect(data).toHaveProperty('confidence')
    expect(data).toHaveProperty('ts')
    expect(data).toHaveProperty('deviceId')
  })

  it('should return 400 for invalid payload', async () => {
    const request = new NextRequest('http://localhost:3000/api/gestures', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': 'test-api-key',
      },
      body: JSON.stringify({
        // Missing required fields
        deviceId: '',
      }),
    })

    const response = await POST(request)

    expect(response.status).toBe(400)
  })

  it('should return 401 for invalid API key', async () => {
    const { validateApiKey } = require('@/lib/middleware')
    validateApiKey.mockReturnValue(false)

    const request = new NextRequest('http://localhost:3000/api/gestures', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': 'invalid-key',
      },
      body: JSON.stringify({
        deviceId: 'test-device',
        timestamp: Date.now(),
      }),
    })

    const response = await POST(request)

    expect(response.status).toBe(401)
  })

  it('should return 429 for rate limit exceeded', async () => {
    const { rateLimit } = require('@/lib/middleware')
    rateLimit.mockResolvedValue({ allowed: false, remaining: 0 })

    const request = new NextRequest('http://localhost:3000/api/gestures', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': 'test-api-key',
      },
      body: JSON.stringify({
        deviceId: 'test-device',
        timestamp: Date.now(),
      }),
    })

    const response = await POST(request)

    expect(response.status).toBe(429)
  })
})

