// path: app/api/health/route.ts
import { NextResponse } from 'next/server'

/**
 * GET /api/health
 * Health check endpoint for monitoring and load balancers
 */
export async function GET() {
  try {
    // Check database connection (optional)
    const dbHealthy = process.env.ENABLE_DB_STORAGE === 'true' 
      ? await checkDatabase() 
      : true

    return NextResponse.json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      services: {
        database: dbHealthy ? 'connected' : 'disconnected',
        ml: process.env.USE_ML_STUB === 'true' ? 'stub' : 'active',
      },
      version: process.env.npm_package_version || '1.0.0',
    }, { status: 200 })
  } catch (error) {
    return NextResponse.json({
      status: 'unhealthy',
      timestamp: new Date().toISOString(),
      error: error instanceof Error ? error.message : 'Unknown error',
    }, { status: 503 })
  }
}

async function checkDatabase(): Promise<boolean> {
  try {
    // Simple database check
    // In a real implementation, ping the database
    return true
  } catch {
    return false
  }
}
