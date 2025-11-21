// path: tests/lib/mlInference.test.ts
import { predictGesture, type GestureInput } from '@/lib/mlInference'

describe('ML Inference', () => {
  beforeEach(() => {
    // Reset environment variables
    process.env.USE_ML_STUB = 'true'
    process.env.ML_SERVICE_URL = ''
    process.env.ML_MODEL_PATH = ''
  })

  it('should return a mock prediction when using stub', async () => {
    const input: GestureInput = {
      sequence: [[1, 2, 3], [4, 5, 6]],
      features: { test: 'data' },
    }

    const result = await predictGesture(input)

    expect(result).toHaveProperty('label')
    expect(result).toHaveProperty('confidence')
    expect(typeof result.label).toBe('string')
    expect(typeof result.confidence).toBe('number')
    expect(result.confidence).toBeGreaterThanOrEqual(0)
    expect(result.confidence).toBeLessThanOrEqual(1)
  })

  it('should handle empty input', async () => {
    const input: GestureInput = {}

    const result = await predictGesture(input)

    expect(result).toHaveProperty('label')
    expect(result).toHaveProperty('confidence')
  })

  it('should return consistent structure', async () => {
    const input: GestureInput = {
      sequence: Array.from({ length: 10 }, () => Array.from({ length: 5 }, () => Math.random())),
    }

    const result = await predictGesture(input)

    expect(result.label).toBeDefined()
    expect(result.confidence).toBeDefined()
    expect(result.confidence).toBeGreaterThan(0)
  })
})

