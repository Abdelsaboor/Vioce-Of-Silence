// path: lib/db.ts
import { MongoClient, Db, Collection } from 'mongodb'

/**
 * MongoDB Database Module
 * 
 * Provides connection and data access functions for gesture records
 * 
 * For production:
 * - Use connection pooling
 * - Implement retry logic
 * - Add database indexes
 * - Use transactions for critical operations
 */

interface GestureRecord {
  deviceId: string
  timestamp: Date
  rawData: unknown
  receivedAt: Date
  prediction?: {
    label: string
    confidence: number
  }
}

let client: MongoClient | null = null
let db: Db | null = null

/**
 * Get MongoDB client (singleton pattern)
 */
async function getClient(): Promise<MongoClient> {
  if (client) {
    return client
  }

  const uri = process.env.MONGODB_URI
  
  if (!uri) {
    throw new Error('MONGODB_URI environment variable is not set')
  }

  client = new MongoClient(uri, {
    // Connection options
    maxPoolSize: 10,
    serverSelectionTimeoutMS: 5000,
  })

  try {
    await client.connect()
    console.log('Connected to MongoDB')
    return client
  } catch (error) {
    console.error('MongoDB connection error:', error)
    client = null
    throw error
  }
}

/**
 * Get database instance
 */
async function getDb(): Promise<Db> {
  if (db) {
    return db
  }

  const client = await getClient()
  const dbName = process.env.MONGODB_DB_NAME || 'voice_of_silence'
  db = client.db(dbName)

  // Create indexes (idempotent)
  try {
    const collection = db.collection<GestureRecord>('gestures')
    await collection.createIndex({ deviceId: 1, timestamp: -1 })
    await collection.createIndex({ timestamp: -1 })
  } catch (error) {
    console.error('Failed to create indexes:', error)
  }

  return db
}

/**
 * Save a gesture record to the database
 */
export async function saveGestureRecord(record: GestureRecord): Promise<void> {
  if (process.env.ENABLE_DB_STORAGE !== 'true') {
    return
  }

  try {
    const database = await getDb()
    const collection = database.collection<GestureRecord>('gestures')
    await collection.insertOne(record)
  } catch (error) {
    console.error('Failed to save gesture record:', error)
    throw error
  }
}

/**
 * Get gesture records for a device
 */
export async function getGestureRecords(
  deviceId: string,
  limit: number = 100
): Promise<GestureRecord[]> {
  try {
    const database = await getDb()
    const collection = database.collection<GestureRecord>('gestures')
    
    const records = await collection
      .find({ deviceId })
      .sort({ timestamp: -1 })
      .limit(limit)
      .toArray()

    return records
  } catch (error) {
    console.error('Failed to get gesture records:', error)
    throw error
  }
}

/**
 * Close database connection
 */
export async function closeDb(): Promise<void> {
  if (client) {
    await client.close()
    client = null
    db = null
    console.log('MongoDB connection closed')
  }
}

// Graceful shutdown
if (typeof process !== 'undefined') {
  process.on('SIGINT', async () => {
    await closeDb()
    process.exit(0)
  })

  process.on('SIGTERM', async () => {
    await closeDb()
    process.exit(0)
  })
}
