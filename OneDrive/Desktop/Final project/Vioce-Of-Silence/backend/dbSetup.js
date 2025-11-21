// Voice of Silence - Production MongoDB Schema Setup for Node.js
// Run this script to initialize the database with collections, validation, and indexes

const { MongoClient } = require('mongodb');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017';
const DB_NAME = 'voice_of_silence';

async function setupDatabase() {
  const client = new MongoClient(MONGO_URI);
  
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    
    const db = client.db(DB_NAME);
    
    // ============================================
    // 1. USER COLLECTION
    // ============================================
    await db.createCollection('users', {
      validator: {
        $jsonSchema: {
          bsonType: 'object',
          required: ['name', 'role', 'email', 'passwordHash'],
          properties: {
            name: {
              bsonType: 'string',
              minLength: 2,
              maxLength: 100,
              description: 'User full name - required'
            },
            role: {
              enum: ['user', 'trainer', 'admin'],
              description: 'User role - must be user, trainer, or admin'
            },
            email: {
              bsonType: 'string',
              pattern: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$',
              description: 'Valid email address - required and unique'
            },
            passwordHash: {
              bsonType: 'string',
              minLength: 60,
              description: 'Bcrypt hashed password - required'
            },
            createdAt: {
              bsonType: 'date',
              description: 'Account creation timestamp'
            },
            updatedAt: {
              bsonType: 'date',
              description: 'Last update timestamp'
            }
          }
        }
      }
    });
    
    // Indexes for User collection
    await db.collection('users').createIndexes([
      { key: { email: 1 }, unique: true, name: 'idx_email_unique' },
      { key: { role: 1 }, name: 'idx_role' },
      { key: { createdAt: -1 }, name: 'idx_created_desc' }
    ]);
    
    console.log('✓ Users collection created');

    // ============================================
    // 2. GLOVE DEVICE COLLECTION
    // ============================================
    await db.createCollection('glove_devices', {
      validator: {
        $jsonSchema: {
          bsonType: 'object',
          required: ['deviceID', 'connectionType', 'firmwareVersion'],
          properties: {
            deviceID: {
              bsonType: 'string',
              pattern: '^[A-Z0-9]{8,16}$',
              description: 'Unique device identifier'
            },
            connectionType: {
              enum: ['Bluetooth', 'WiFi'],
              description: 'Connection type'
            },
            firmwareVersion: {
              bsonType: 'string',
              pattern: '^\\d+\\.\\d+\\.\\d+$',
              description: 'Firmware version (semantic versioning)'
            },
            userID: {
              bsonType: 'objectId',
              description: 'Reference to user who owns this device'
            },
            createdAt: {
              bsonType: 'date',
              description: 'Device registration date'
            }
          }
        }
      }
    });
    
    await db.collection('glove_devices').createIndexes([
      { key: { deviceID: 1 }, unique: true, name: 'idx_device_unique' },
      { key: { userID: 1 }, name: 'idx_user_device' },
      { key: { connectionType: 1 }, name: 'idx_connection_type' }
    ]);
    
    console.log('✓ Glove devices collection created');

    // ============================================
    // 3. GESTURE DATA COLLECTION
    // ============================================
    await db.createCollection('gesture_data', {
      validator: {
        $jsonSchema: {
          bsonType: 'object',
          required: ['sensorValues', 'userID'],
          properties: {
            sensorValues: {
              bsonType: 'array',
              minItems: 1,
              maxItems: 100,
              items: {
                bsonType: 'double'
              },
              description: 'Array of sensor readings'
            },
            timestamp: {
              bsonType: 'date',
              description: 'Gesture capture time'
            },
            userID: {
              bsonType: 'objectId',
              description: 'Reference to user who performed gesture'
            }
          }
        }
      }
    });
    
    await db.collection('gesture_data').createIndexes([
      { key: { userID: 1, timestamp: -1 }, name: 'idx_user_timestamp' },
      { key: { timestamp: -1 }, name: 'idx_timestamp_desc' },
      { key: { timestamp: 1 }, expireAfterSeconds: 7776000, name: 'idx_ttl_90days' } // Auto-delete after 90 days
    ]);
    
    console.log('✓ Gesture data collection created');

    // ============================================
    // 4. PREDICTION RESULT COLLECTION
    // ============================================
    await db.createCollection('prediction_results', {
      validator: {
        $jsonSchema: {
          bsonType: 'object',
          required: ['word', 'confidenceLevel', 'gestureID'],
          properties: {
            word: {
              bsonType: 'string',
              minLength: 1,
              maxLength: 100,
              description: 'Predicted word or phrase'
            },
            confidenceLevel: {
              bsonType: 'double',
              minimum: 0,
              maximum: 1,
              description: 'Confidence score between 0 and 1'
            },
            gestureID: {
              bsonType: 'objectId',
              description: 'Reference to gesture data'
            }
          }
        }
      }
    });
    
    await db.collection('prediction_results').createIndexes([
      { key: { gestureID: 1 }, unique: true, name: 'idx_gesture_unique' },
      { key: { confidenceLevel: -1 }, name: 'idx_confidence_desc' },
      { key: { word: 1 }, name: 'idx_word' }
    ]);
    
    console.log('✓ Prediction results collection created');

    // ============================================
    // 5. MESSAGE COLLECTION
    // ============================================
    await db.createCollection('messages', {
      validator: {
        $jsonSchema: {
          bsonType: 'object',
          required: ['senderID', 'receiverID', 'content'],
          properties: {
            senderID: {
              bsonType: 'objectId',
              description: 'Reference to sender user'
            },
            receiverID: {
              bsonType: 'objectId',
              description: 'Reference to receiver user'
            },
            content: {
              bsonType: 'string',
              minLength: 1,
              maxLength: 5000,
              description: 'Message content'
            },
            createdAt: {
              bsonType: 'date',
              description: 'Message sent timestamp'
            }
          }
        }
      }
    });
    
    await db.collection('messages').createIndexes([
      { key: { senderID: 1, createdAt: -1 }, name: 'idx_sender_time' },
      { key: { receiverID: 1, createdAt: -1 }, name: 'idx_receiver_time' },
      { key: { senderID: 1, receiverID: 1, createdAt: -1 }, name: 'idx_conversation' },
      { key: { createdAt: -1 }, name: 'idx_created_desc_msg' }
    ]);
    
    console.log('✓ Messages collection created');

    // ============================================
    // 6. TRAINING SESSION COLLECTION
    // ============================================
    await db.createCollection('training_sessions', {
      validator: {
        $jsonSchema: {
          bsonType: 'object',
          required: ['userID', 'gestureID', 'accuracy'],
          properties: {
            userID: {
              bsonType: 'objectId',
              description: 'Reference to user in training'
            },
            gestureID: {
              bsonType: 'objectId',
              description: 'Reference to gesture being practiced'
            },
            accuracy: {
              bsonType: 'double',
              minimum: 0,
              maximum: 100,
              description: 'Accuracy percentage (0-100)'
            },
            feedback: {
              bsonType: 'string',
              maxLength: 1000,
              description: 'Trainer feedback or AI suggestions'
            },
            createdAt: {
              bsonType: 'date',
              description: 'Training session timestamp'
            }
          }
        }
      }
    });
    
    await db.collection('training_sessions').createIndexes([
      { key: { userID: 1, createdAt: -1 }, name: 'idx_user_training_time' },
      { key: { gestureID: 1 }, name: 'idx_gesture_training' },
      { key: { accuracy: -1 }, name: 'idx_accuracy_desc' }
    ]);
    
    console.log('✓ Training sessions collection created');

    // ============================================
    // 7. AUDIO OUTPUT COLLECTION
    // ============================================
    await db.createCollection('audio_outputs', {
      validator: {
        $jsonSchema: {
          bsonType: 'object',
          required: ['messageID', 'filePath'],
          properties: {
            messageID: {
              bsonType: 'objectId',
              description: 'Reference to message'
            },
            filePath: {
              bsonType: 'string',
              pattern: '^(audio/|s3://|https://)',
              description: 'Audio file path or URL'
            },
            createdAt: {
              bsonType: 'date',
              description: 'Audio generation timestamp'
            }
          }
        }
      }
    });
    
    await db.collection('audio_outputs').createIndexes([
      { key: { messageID: 1 }, unique: true, name: 'idx_message_audio_unique' },
      { key: { createdAt: -1 }, name: 'idx_audio_created' }
    ]);
    
    console.log('✓ Audio outputs collection created');

    // ============================================
    // SAMPLE DATA INSERTION
    // ============================================
    console.log('\nInserting sample data...');
    
    const sampleUser = await db.collection('users').insertOne({
      name: 'John Doe',
      role: 'user',
      email: 'john.doe@example.com',
      passwordHash: '$2b$10$abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ12', // Sample bcrypt hash
      createdAt: new Date(),
      updatedAt: new Date()
    });
    
    const sampleDevice = await db.collection('glove_devices').insertOne({
      deviceID: 'VOS12345ABCD',
      connectionType: 'Bluetooth',
      firmwareVersion: '1.2.3',
      userID: sampleUser.insertedId,
      createdAt: new Date()
    });
    
    const sampleGesture = await db.collection('gesture_data').insertOne({
      sensorValues: [0.45, 0.67, 0.23, 0.89, 0.12],
      timestamp: new Date(),
      userID: sampleUser.insertedId
    });
    
    await db.collection('prediction_results').insertOne({
      word: 'hello',
      confidenceLevel: 0.95,
      gestureID: sampleGesture.insertedId
    });
    
    console.log('✓ Sample data inserted');

    console.log('\n========================================');
    console.log('Database setup completed successfully!');
    console.log('========================================\n');
    
  } catch (error) {
    console.error('Error setting up database:', error);
    throw error;
  } finally {
    await client.close();
  }
}

// ============================================
// SAMPLE QUERIES FOR COMMON OPERATIONS
// ============================================

// Export commonly used query functions
class VoiceOfSilenceDB {
  constructor(client, dbName = DB_NAME) {
    this.db = client.db(dbName);
  }

  // 1. Fetch user messages (conversation between two users)
  async getUserMessages(senderID, receiverID, limit = 50) {
    return await this.db.collection('messages')
      .find({
        $or: [
          { senderID: senderID, receiverID: receiverID },
          { senderID: receiverID, receiverID: senderID }
        ]
      })
      .sort({ createdAt: -1 })
      .limit(limit)
      .toArray();
  }

  // 2. Fetch gesture predictions for a user
  async getUserGesturePredictions(userID, startDate, endDate) {
    return await this.db.collection('gesture_data').aggregate([
      {
        $match: {
          userID: userID,
          timestamp: { $gte: startDate, $lte: endDate }
        }
      },
      {
        $lookup: {
          from: 'prediction_results',
          localField: '_id',
          foreignField: 'gestureID',
          as: 'prediction'
        }
      },
      {
        $unwind: '$prediction'
      },
      {
        $sort: { timestamp: -1 }
      }
    ]).toArray();
  }

  // 3. Get training sessions for a user
  async getUserTrainingSessions(userID, limit = 20) {
    return await this.db.collection('training_sessions')
      .find({ userID: userID })
      .sort({ createdAt: -1 })
      .limit(limit)
      .toArray();
  }

  // 4. Get user's devices
  async getUserDevices(userID) {
    return await this.db.collection('glove_devices')
      .find({ userID: userID })
      .toArray();
  }

  // 5. Get recent high-confidence predictions
  async getHighConfidencePredictions(minConfidence = 0.8, limit = 100) {
    return await this.db.collection('prediction_results')
      .find({ confidenceLevel: { $gte: minConfidence } })
      .sort({ confidenceLevel: -1 })
      .limit(limit)
      .toArray();
  }

  // 6. Get conversation with audio
  async getConversationWithAudio(senderID, receiverID) {
    return await this.db.collection('messages').aggregate([
      {
        $match: {
          $or: [
            { senderID: senderID, receiverID: receiverID },
            { senderID: receiverID, receiverID: senderID }
          ]
        }
      },
      {
        $lookup: {
          from: 'audio_outputs',
          localField: '_id',
          foreignField: 'messageID',
          as: 'audio'
        }
      },
      {
        $sort: { createdAt: -1 }
      }
    ]).toArray();
  }

  // 7. Get training progress analytics
  async getTrainingProgress(userID) {
    return await this.db.collection('training_sessions').aggregate([
      {
        $match: { userID: userID }
      },
      {
        $group: {
          _id: null,
          avgAccuracy: { $avg: '$accuracy' },
          totalSessions: { $sum: 1 },
          maxAccuracy: { $max: '$accuracy' },
          minAccuracy: { $min: '$accuracy' }
        }
      }
    ]).toArray();
  }
}

// ============================================
// SHARDING & REPLICATION RECOMMENDATIONS
// ============================================

/*
SHARDING STRATEGY:
------------------
For high-volume collections (gesture_data, messages, training_sessions):

1. Enable sharding on the database:
   sh.enableSharding("voice_of_silence")

2. Shard gesture_data by userID and timestamp (compound shard key):
   db.gesture_data.createIndex({ userID: 1, timestamp: 1 })
   sh.shardCollection("voice_of_silence.gesture_data", { userID: 1, timestamp: 1 })

3. Shard messages by senderID:
   db.messages.createIndex({ senderID: 1, createdAt: 1 })
   sh.shardCollection("voice_of_silence.messages", { senderID: 1, createdAt: 1 })

REPLICATION:
------------
- Use a replica set with minimum 3 nodes (1 primary, 2 secondaries)
- Enable write concern majority for critical operations
- Use read preference secondary for analytics queries

Configuration example:
rs.initiate({
  _id: "vosSilenceRS",
  members: [
    { _id: 0, host: "mongo1:27017", priority: 2 },
    { _id: 1, host: "mongo2:27017", priority: 1 },
    { _id: 2, host: "mongo3:27017", priority: 1 }
  ]
})

BACKUP STRATEGY:
----------------
- Automated daily backups using mongodump
- Point-in-time recovery with oplog
- Off-site backup storage
- Test restore procedures monthly

MONITORING:
-----------
- MongoDB Atlas monitoring or Prometheus + Grafana
- Alert on: connection pool exhaustion, replication lag, disk usage
- Track query performance with slow query log
*/

// Run setup
if (require.main === module) {
  setupDatabase()
    .then(() => process.exit(0))
    .catch(err => {
      console.error(err);
      process.exit(1);
    });
}

module.exports = { setupDatabase, VoiceOfSilenceDB };