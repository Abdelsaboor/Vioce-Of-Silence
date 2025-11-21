// path: lib/validation.ts
import { z } from 'zod'
import type { SensorFrame } from '@/types'

const SensorFrameSchema = z.object({
  deviceId: z.string().min(1).max(100),
  timestamp: z.number().int().positive(),
  sequence: z.array(z.array(z.number())).optional(),
  features: z.record(z.number()).optional(),
  meta: z.record(z.unknown()).optional(),
})

export function validateGesturePayload(payload: unknown) {
  try {
    const data = SensorFrameSchema.parse(payload) as SensorFrame
    
    // Additional validation
    if (JSON.stringify(payload).length > 1024 * 100) { // 100KB limit
      return {
        success: false,
        error: 'Payload too large (max 100KB)'
      }
    }

    return {
      success: true,
      data
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: error.errors.map(e => `${e.path.join('.')}: ${e.message}`).join(', ')
      }
    }
    return {
      success: false,
      error: 'Invalid payload format'
    }
  }
}