# Setup Environment Variables Script
# Run this script to create .env.local file

$envContent = @"
MONGODB_URI=mongodb://localhost:27017/voice-of-silence
MONGODB_DB_NAME=voice_of_silence
API_KEY=dev-api-key-123
ALLOWED_ORIGIN=http://localhost:3000
USE_ML_STUB=true
ML_SERVICE_URL=
ML_MODEL_PATH=
WS_PORT=3001
WS_ENABLED=true
SENTRY_DSN=
ENABLE_METRICS=true
NODE_ENV=development
PORT=3000
ENABLE_DB_STORAGE=false
ENABLE_RATE_LIMITING=false
RATE_LIMIT_WINDOW_MS=60000
RATE_LIMIT_MAX_REQUESTS=100
"@

if (Test-Path .env.local) {
    Write-Host ".env.local already exists. Skipping creation." -ForegroundColor Yellow
} else {
    $envContent | Out-File -FilePath .env.local -Encoding utf8
    Write-Host ".env.local file created successfully!" -ForegroundColor Green
    Write-Host "You can edit it to customize your configuration." -ForegroundColor Cyan
}

