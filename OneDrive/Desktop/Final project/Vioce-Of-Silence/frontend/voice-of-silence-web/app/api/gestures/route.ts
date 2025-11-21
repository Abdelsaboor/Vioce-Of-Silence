// path: app/api/gestures/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { predictGesture } from '@/lib/mlInference'
import { saveGestureRecord } from '@/lib/db'
import { validateApiKey, rateLimit } from '@/lib/middleware'

// Schema for gesture data validation
const GestureSchema = z.object({
  deviceId: z.string().min(1).max(100),
  timestamp: z.number().int().positive(),
  sequence: z.array(z.array(z.number())).optional(),
  features: z.record(z.unknown()).optional(),
  meta: z.record(z.unknown()).optional(),
})

// Maximum payload size: 1MB
const MAX_PAYLOAD_SIZE = 1024 * 1024

/**
 * POST /api/gestures
 * Accepts sensor data, runs ML inference, and returns prediction
 */
export async function POST(request: NextRequest) {
  try {
    // Rate limiting check
    const rateLimitResult = await rateLimit(request)
    if (!rateLimitResult.allowed) {
      return NextResponse.json(
        { error: 'Rate limit exceeded' },
        { status: 429 }
      )
    }

    // API key validation
    const apiKey = request.headers.get('x-api-key')
    if (!validateApiKey(apiKey)) {
      return NextResponse.json(
        { error: 'Unauthorized: Invalid API key' },
        { status: 401 }
      )
    }

    // Check content length
    const contentLength = request.headers.get('content-length')
    if (contentLength && parseInt(contentLength) > MAX_PAYLOAD_SIZE) {
      return NextResponse.json(
        { error: 'Payload too large' },
        { status: 413 }
      )
    }

    // Parse and validate request body
    const body = await request.json()
    const validationResult = GestureSchema.safeParse(body)

    if (!validationResult.success) {
      return NextResponse.json(
        { 
          error: 'Invalid request payload',
          details: validationResult.error.errors 
        },
        { status: 400 }
      )
    }

    const data = validationResult.data

    // Save to database (if enabled)
    if (process.env.ENABLE_DB_STORAGE === 'true') {
      try {
        await saveGestureRecord({
          deviceId: data.deviceId,
          timestamp: new Date(data.timestamp),
          rawData: data,
          receivedAt: new Date(),
        })
      } catch (dbError) {
        // Log error but don't fail the request
        console.error('Database save failed:', dbError)
      }
    }

    // Run ML inference
    const inferenceInput = {
      sequence: data.sequence || [],
      features: data.features || {},
    }

    const prediction = await predictGesture(inferenceInput)

    // Return prediction
    return NextResponse.json({
      label: prediction.label,
      confidence: prediction.confidence,
      ts: Date.now(),
      deviceId: data.deviceId,
    }, { status: 200 })

  } catch (error) {
    console.error('Gesture API error:', error)
    
    if (error instanceof SyntaxError) {
      return NextResponse.json(
        { error: 'Invalid JSON' },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

/**
 * OPTIONS handler for CORS
 */
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': process.env.ALLOWED_ORIGIN || '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, X-Api-Key',
    },
  })
}
