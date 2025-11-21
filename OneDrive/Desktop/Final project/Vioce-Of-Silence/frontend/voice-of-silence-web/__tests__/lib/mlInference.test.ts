// path: __tests__/lib/mlInference.test.ts
import { predictGesture } from '@/lib/mlInference'
import type { SensorFrame } from '@/types'

describe('ML Inference', () => {
  it('returns prediction with label and confidence', async () => {
    const mockData: SensorFrame = {
      deviceId: 'test-device',
      timestamp: Date.now(),
      features: { flex1: 0.5, flex2: 0.3 }
    }

    const result = await predictGesture(mockData)

    expect(result).toHaveProperty('label')
    expect(result).toHaveProperty('confidence')
    expect(typeof result.label).toBe('string')
    expect(typeof result.confidence).toBe('number')
    expect(result.confidence).toBeGreaterThanOrEqual(0)
    expect(result.confidence).toBeLessThanOrEqual(1)
  })

  it('produces deterministic results for same input', async () => {
    const mockData: SensorFrame = {
      deviceId: 'test-device',
      timestamp: 1234567890,
      features: {}
    }

    const result1 = await predictGesture(mockData)
    const result2 = await predictGesture(mockData)

    expect(result1.label).toBe(result2.label)
    expect(result1.confidence).toBe(result2.confidence)
  })

  it('returns valid gesture labels', async () => {
    const mockData: SensorFrame = {
      deviceId: 'test-device',
      timestamp: Date.now(),
      features: {}
    }

    const validLabels = ['hello', 'thank_you', 'yes', 'no', 'help', 'goodbye', 'please', 'sorry']
    const result = await predictGesture(mockData)

    expect(validLabels).toContain(result.label)
  })
})