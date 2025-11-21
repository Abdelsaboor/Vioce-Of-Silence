// path: lib/websocket-server.ts
/**
 * WebSocket Server Implementation Example
 * 
 * This is a standalone WebSocket server that can be used for real-time gesture streaming.
 * Next.js API routes don't natively support WebSocket upgrades, so use this as a separate service.
 * 
 * Usage:
 * 1. Install: npm install ws
 * 2. Run: node lib/websocket-server.js (or use as a separate service)
 * 3. Connect from client: new WebSocket('ws://localhost:3001')
 * 
 * For production, consider:
 * - uWebSockets.js (faster, lower memory)
 * - Socket.io (more features, rooms, namespaces)
 * - Cloud services (AWS API Gateway WebSocket, Pusher, Ably)
 */

import { WebSocketServer, WebSocket } from 'ws'
import { predictGesture, type GestureInput } from './mlInference'

interface ClientConnection {
  ws: WebSocket
  deviceId?: string
  lastActivity: number
}

const clients = new Map<WebSocket, ClientConnection>()
const PORT = parseInt(process.env.WS_PORT || '3001')

export function createWebSocketServer(): WebSocketServer {
  const wss = new WebSocketServer({ port: PORT })

  wss.on('connection', (ws: WebSocket) => {
    console.log('New WebSocket connection')
    
    const connection: ClientConnection = {
      ws,
      lastActivity: Date.now(),
    }
    
    clients.set(ws, connection)

    // Send welcome message
    ws.send(JSON.stringify({
      type: 'connected',
      message: 'WebSocket connection established',
    }))

    // Handle incoming messages
    ws.on('message', async (data: Buffer) => {
      try {
        const message = JSON.parse(data.toString())
        connection.lastActivity = Date.now()

        switch (message.type) {
          case 'gesture_data':
            await handleGestureData(ws, message)
            break
          
          case 'register_device':
            connection.deviceId = message.deviceId
            ws.send(JSON.stringify({
              type: 'device_registered',
              deviceId: message.deviceId,
            }))
            break
          
          default:
            ws.send(JSON.stringify({
              type: 'error',
              message: 'Unknown message type',
            }))
        }
      } catch (error) {
        console.error('WebSocket message error:', error)
        ws.send(JSON.stringify({
          type: 'error',
          message: 'Invalid message format',
        }))
      }
    })

    // Handle connection close
    ws.on('close', () => {
      console.log('WebSocket connection closed')
      clients.delete(ws)
    })

    // Handle errors
    ws.on('error', (error) => {
      console.error('WebSocket error:', error)
      clients.delete(ws)
    })

    // Ping/pong for keepalive
    const pingInterval = setInterval(() => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.ping()
      } else {
        clearInterval(pingInterval)
      }
    }, 30000)
  })

  console.log(`WebSocket server listening on port ${PORT}`)
  return wss
}

async function handleGestureData(ws: WebSocket, message: any) {
  try {
    const input: GestureInput = {
      sequence: message.sequence,
      features: message.features,
    }

    // Run ML inference
    const prediction = await predictGesture(input)

    // Send prediction back to client
    ws.send(JSON.stringify({
      type: 'prediction',
      label: prediction.label,
      confidence: prediction.confidence,
      ts: Date.now(),
    }))

    // Optionally broadcast to other clients (for multi-user scenarios)
    // broadcastPrediction(prediction)
  } catch (error) {
    console.error('Gesture processing error:', error)
    ws.send(JSON.stringify({
      type: 'error',
      message: 'Failed to process gesture',
    }))
  }
}

function broadcastPrediction(prediction: { label: string; confidence: number }) {
  const message = JSON.stringify({
    type: 'broadcast_prediction',
    ...prediction,
    ts: Date.now(),
  })

  clients.forEach((connection) => {
    if (connection.ws.readyState === WebSocket.OPEN) {
      connection.ws.send(message)
    }
  })
}

// Cleanup inactive connections
setInterval(() => {
  const now = Date.now()
  const TIMEOUT = 5 * 60 * 1000 // 5 minutes

  clients.forEach((connection, ws) => {
    if (now - connection.lastActivity > TIMEOUT) {
      console.log('Closing inactive connection')
      ws.close()
      clients.delete(ws)
    }
  })
}, 60000) // Check every minute

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('Shutting down WebSocket server')
  clients.forEach((connection) => {
    connection.ws.close()
  })
  process.exit(0)
})

// Export server creation function
// To run as a standalone server:
// npx tsx lib/websocket-server.ts
// or compile to JS and run: node lib/websocket-server.js

