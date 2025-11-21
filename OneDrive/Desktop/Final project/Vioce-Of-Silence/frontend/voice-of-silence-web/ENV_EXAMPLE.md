# Environment Variables Example

Copy this content to a `.env.local` file in the root directory:

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

## Notes

- `.env.local` is gitignored and used for local development
- For production, set these variables in your deployment platform (Vercel, Docker, Kubernetes, etc.)
- Never commit sensitive values like API keys to version control

