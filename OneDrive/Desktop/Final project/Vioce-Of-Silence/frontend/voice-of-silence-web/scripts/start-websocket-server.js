// path: scripts/start-websocket-server.js
/**
 * Standalone WebSocket server script
 * Run with: node scripts/start-websocket-server.js
 * 
 * This starts a separate WebSocket server for real-time gesture streaming.
 * The Next.js app can connect to this server for WebSocket functionality.
 */

require('dotenv').config({ path: '.env.local' })

const { createWebSocketServer } = require('../lib/websocket-server')

console.log('Starting WebSocket server...')
createWebSocketServer()

