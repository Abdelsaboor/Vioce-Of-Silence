# Voice of Silence - Smart Glove Gesture Recognition

A production-ready Next.js web application that receives smart-glove sensor data, recognizes gestures using ML, displays translations, and provides text-to-speech output. Features a dark-themed, interactive 3D landing page with React Three Fiber.

## 🎯 Project Overview

Voice of Silence is a full-stack web application that bridges the gap between sign language and spoken communication. It provides:

- **3D Interactive Landing Page**: Immersive experience with React Three Fiber
- **Real-time Gesture Recognition**: ML-powered gesture detection from sensor data
- **Text-to-Speech**: Converts recognized gestures to spoken words
- **RESTful API**: Secure endpoints for sensor data ingestion
- **WebSocket Support**: Real-time communication (stub implementation)
- **Multi-language Support**: i18n with English, Spanish, French, and German
- **Production Ready**: Docker, CI/CD, tests, and monitoring setup

## 🏗️ Architecture

```
┌─────────────────┐
│   Client (Web)  │
│  Next.js + React│
│  Three Fiber    │
└────────┬────────┘
         │
         │ HTTP/WebSocket
         │
┌────────▼────────┐
│  Next.js API    │
│  Routes         │
└────────┬────────┘
         │
    ┌────┴────┐
    │         │
┌───▼───┐ ┌──▼────┐
│ MongoDB│ │  ML   │
│        │ │Service│
└────────┘ └───────┘
```

## 🚀 Quick Start

### Prerequisites

- Node.js 20+ and npm
- Docker and Docker Compose (optional, for containerized deployment)
- MongoDB (or use Docker Compose)

### Local Development

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd voice-of-silence-web
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Start MongoDB** (if not using Docker)
   ```bash
   # Install and start MongoDB locally
   # Or use Docker: docker run -d -p 27017:27017 mongo:7
   ```

5. **Run development server**
   ```bash
   npm run dev
   ```

6. **Open browser**
   ```
   http://localhost:3000
   ```

### Docker Deployment

1. **Build and run with Docker Compose**
   ```bash
   docker-compose up --build
   ```

2. **Access the application**
   - App: http://localhost:3000
   - MongoDB Express: http://localhost:8081 (if enabled)

3. **Stop containers**
   ```bash
   docker-compose down
   ```

## 📁 Project Structure

```
voice-of-silence-web/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   │   ├── gestures/      # Gesture recognition endpoint
│   │   └── ws/            # WebSocket endpoint stub
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── 3d/               # 3D components (React Three Fiber)
│   │   ├── Scene.tsx
│   │   └── GloveModel.tsx
│   ├── sections/         # Landing page sections
│   │   ├── Hero.tsx
│   │   ├── HowItWorks.tsx
│   │   ├── Features.tsx
│   │   ├── TechStack.tsx
│   │   └── Footer.tsx
│   ├── ui/               # UI components
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   └── SectionTitle.tsx
│   └── Navbar.tsx
├── lib/                  # Utility libraries
│   ├── mlInference.ts    # ML inference stub
│   ├── db.ts             # MongoDB client
│   ├── speechSynthesis.ts # TTS functionality
│   ├── i18n.ts           # Internationalization
│   └── middleware.ts     # Auth & rate limiting
├── public/               # Static assets
│   └── models/           # 3D models (GLB files)
├── tests/                # Test files
├── Dockerfile            # Docker image definition
├── docker-compose.yml    # Docker Compose configuration
└── README.md
```

## 🔧 Configuration

### Environment Variables

Create a `.env` file from `.env.example`:

```bash
# Database
MONGODB_URI=mongodb://localhost:27017/voice-of-silence
MONGODB_DB_NAME=voice_of_silence

# API Security
API_KEY=your-secret-api-key-here
ALLOWED_ORIGIN=http://localhost:3000

# ML Inference
ML_MODEL_PATH=./models/gesture_model.h5
ML_SERVICE_URL=http://localhost:8000/predict
USE_ML_STUB=true

# WebSocket
WS_PORT=3001
WS_ENABLED=true

# Monitoring
SENTRY_DSN=
ENABLE_METRICS=true

# App
NODE_ENV=development
PORT=3000

# Feature Flags
ENABLE_DB_STORAGE=true
ENABLE_RATE_LIMITING=true
RATE_LIMIT_WINDOW_MS=60000
RATE_LIMIT_MAX_REQUESTS=100
```

## 🧪 Testing

### Run Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

### Test Structure

- **Unit Tests**: `tests/lib/` - Test utility functions
- **API Tests**: `tests/app/api/` - Test API routes
- **Component Tests**: `tests/components/` - Test React components

### Example Test

```bash
# Test ML inference
npm test -- mlInference.test.ts

# Test API route
npm test -- route.test.ts

# Test component
npm test -- Hero.test.tsx
```

## 🏗️ Building for Production

### Build the Application

```bash
npm run build
```

### Start Production Server

```bash
npm start
```

### Docker Build

```bash
# Build Docker image
docker build -t voice-of-silence-web .

# Run container
docker run -p 3000:3000 --env-file .env voice-of-silence-web
```

## 📡 API Documentation

### POST /api/gestures

Recognizes a gesture from sensor data.

**Request:**
```json
{
  "deviceId": "string",
  "timestamp": 1670000000000,
  "sequence": [[...], [...]],
  "features": {},
  "meta": {}
}
```

**Response:**
```json
{
  "label": "Hello",
  "confidence": 0.95,
  "ts": 1670000000000,
  "deviceId": "string"
}
```

**Headers:**
- `Content-Type: application/json`
- `x-api-key: your-api-key`

**Status Codes:**
- `200`: Success
- `400`: Invalid request
- `401`: Unauthorized
- `429`: Rate limit exceeded
- `500`: Internal server error

### WebSocket /api/ws/gestures

WebSocket endpoint for real-time gesture streaming (stub implementation).

**Note**: For production, use a dedicated WebSocket server or cloud service.

## 🤖 ML Model Integration

### Using the Stub (Default)

The application uses a mock ML inference by default. To enable it:

```env
USE_ML_STUB=true
```

### Integrating a Real ML Model

#### Option 1: TensorFlow.js (Browser/Node.js)

1. Install TensorFlow.js:
   ```bash
   npm install @tensorflow/tfjs-node
   ```

2. Update `lib/mlInference.ts`:
   ```typescript
   import * as tf from '@tensorflow/tfjs-node'
   import { loadLayersModel } from '@tensorflow/tfjs'

   // Load your model
   const model = await loadLayersModel('path/to/model.json')
   ```

3. Set environment variable:
   ```env
   USE_ML_STUB=false
   ML_MODEL_PATH=./models/your_model.json
   ```

#### Option 2: Remote ML Service

1. Deploy your ML model as a REST API (e.g., TensorFlow Serving, PyTorch Serve)

2. Update `lib/mlInference.ts` to call your service

3. Set environment variable:
   ```env
   USE_ML_STUB=false
   ML_SERVICE_URL=http://your-ml-service.com/predict
   ```

#### Option 3: Cloud ML Services

- **AWS SageMaker**: Use AWS SDK to invoke endpoints
- **Google AI Platform**: Use Google Cloud client libraries
- **Azure ML**: Use Azure ML SDK

### Model Requirements

- Input: Sensor data array (sequence of sensor vectors)
- Output: Gesture label and confidence score
- Format: TensorFlow.js, ONNX, or REST API

## 🎨 3D Model Integration

### Adding Your GLB Model

1. Export your 3D glove model as a GLB file
2. Place it in `public/models/smart_glove.glb`
3. The model will be automatically loaded by the `GloveModel` component

### Model Specifications

- **Format**: GLB (binary glTF)
- **Polygons**: < 10,000 for web performance
- **Textures**: Embedded or referenced
- **Animations**: Optional (will be automatically detected)

### Fallback

If no GLB model is provided, the application uses a procedural fallback geometry.

## 🌐 Internationalization (i18n)

### Supported Languages

- English (en)
- Spanish (es)
- French (fr)
- German (de)

### Adding a New Language

1. Update `lib/i18n.ts`:
   ```typescript
   const translations: Record<Language, Translations> = {
     // ... existing languages
     yourLang: {
       nav: { ... },
       hero: { ... },
       // ...
     },
   }
   ```

2. Add language selector in `components/Navbar.tsx`

## 🔒 Security

### API Authentication

The API uses API key authentication. Set `API_KEY` in environment variables.

**For production**, replace with:
- JWT tokens
- OAuth 2.0
- AWS Cognito
- Auth0

### Rate Limiting

Rate limiting is enabled by default. Configure in `.env`:

```env
ENABLE_RATE_LIMITING=true
RATE_LIMIT_WINDOW_MS=60000
RATE_LIMIT_MAX_REQUESTS=100
```

**For production**, use Redis-based rate limiting (e.g., Upstash).

### Input Validation

All API inputs are validated using Zod schemas. Malformed requests are rejected.

### CORS

Configure allowed origins in `.env`:

```env
ALLOWED_ORIGIN=https://yourdomain.com
```

## 📊 Monitoring & Logging

### Logging

Logs are written to stdout in JSON format. For production:

- **CloudWatch** (AWS)
- **Stackdriver** (GCP)
- **Application Insights** (Azure)

### Sentry Integration

1. Get your Sentry DSN
2. Set in `.env`:
   ```env
   SENTRY_DSN=your-sentry-dsn
   ```
3. Install Sentry SDK:
   ```bash
   npm install @sentry/nextjs
   ```

### Prometheus Metrics

The application can expose Prometheus metrics. Add endpoint:

```typescript
// app/api/metrics/route.ts
export async function GET() {
  // Return Prometheus metrics
}
```

## 🚀 Deployment

### Vercel

1. Connect your repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main

### Docker/Kubernetes

1. **Build Docker image:**
   ```bash
   docker build -t voice-of-silence-web .
   ```

2. **Push to registry:**
   ```bash
   docker tag voice-of-silence-web your-registry/voice-of-silence-web
   docker push your-registry/voice-of-silence-web
   ```

3. **Deploy to Kubernetes:**
   ```yaml
   apiVersion: apps/v1
   kind: Deployment
   metadata:
     name: voice-of-silence-web
   spec:
     replicas: 3
     template:
       spec:
         containers:
         - name: app
           image: your-registry/voice-of-silence-web
           env:
           - name: MONGODB_URI
             valueFrom:
               secretKeyRef:
                 name: mongodb-secret
                 key: uri
   ```

### AWS (EC2/EKS)

1. Use Docker image on EC2
2. Or deploy to EKS using Kubernetes manifests
3. Set up ALB for load balancing
4. Configure RDS or DocumentDB for MongoDB

### Google Cloud (GKE)

1. Build and push to Google Container Registry
2. Deploy to GKE cluster
3. Use Cloud SQL for MongoDB or MongoDB Atlas

## 🧩 CI/CD

### GitHub Actions

The CI pipeline runs on every push:

1. **Lint**: ESLint checks
2. **Test**: Jest tests
3. **Build**: Next.js build
4. **Docker**: Docker image build

### Manual Deployment

Uncomment deployment steps in `.github/workflows/ci.yml`:

- Vercel deployment
- Docker Hub push
- Kubernetes deployment

## ♿ Accessibility

### Features

- **ARIA labels**: All interactive elements have proper labels
- **Keyboard navigation**: Full keyboard support
- **Focus indicators**: Visible focus states
- **Color contrast**: WCAG AA compliant
- **Reduced motion**: Respects `prefers-reduced-motion`

### Testing

```bash
# Install axe-core
npm install -D @axe-core/react

# Run Lighthouse
npm run lighthouse

# Or use browser DevTools
```

## 🎨 Brand Colors

- **Background**: `#0D0F14`
- **Gradient Cyan**: `#33D6F0`
- **Gradient Blue**: `#4597E6`
- **Gradient Purple**: `#B67FFC`
- **Accent Glow**: `#7A3DFF`

## 📝 Performance Checklist

- ✅ Code splitting with Next.js
- ✅ Image optimization
- ✅ Lazy loading for 3D models
- ✅ Memoization for expensive computations
- ✅ Server-side rendering where appropriate
- ✅ CDN for static assets
- ✅ Database query optimization
- ✅ Caching strategies

## 🐛 Troubleshooting

### MongoDB Connection Issues

```bash
# Check MongoDB is running
docker ps | grep mongo

# Check connection string
echo $MONGODB_URI

# Test connection
mongosh $MONGODB_URI
```

### 3D Model Not Loading

1. Check file exists: `public/models/smart_glove.glb`
2. Check browser console for errors
3. Verify GLB format is valid
4. Fallback geometry will be used if model is missing

### API Errors

1. Check API key is set correctly
2. Verify rate limits are not exceeded
3. Check MongoDB connection
4. Review server logs

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Three Fiber](https://docs.pmnd.rs/react-three-fiber)
- [MongoDB Node.js Driver](https://www.mongodb.com/docs/drivers/node/current/)
- [TensorFlow.js](https://www.tensorflow.org/js)
- [Web Speech API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API)

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## 📧 Contact

For questions and support, please open an issue on GitHub.

---

**Built with ❤️ using Next.js, React Three Fiber, and TypeScript**
