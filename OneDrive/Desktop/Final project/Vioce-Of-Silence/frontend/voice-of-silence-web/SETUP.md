# Setup Guide

This guide will help you set up and run the Voice of Silence web application.

## Prerequisites

- **Node.js**: Version 20 or higher
- **npm**: Version 9 or higher (comes with Node.js)
- **MongoDB**: Version 7 or higher (or use Docker)
- **Docker** (optional): For containerized deployment

## Step 1: Install Dependencies

```bash
npm install
```

This will install all required packages including:
- Next.js 14
- React 18
- React Three Fiber (3D graphics)
- MongoDB driver
- TypeScript
- Testing libraries
- And more...

## Step 2: Configure Environment Variables

1. Create a `.env.local` file in the root directory:

```bash
cp ENV_EXAMPLE.md .env.local
```

2. Edit `.env.local` and set your configuration:

```bash
# Database (use MongoDB URI or local connection)
MONGODB_URI=mongodb://localhost:27017/voice-of-silence

# API Security (change this in production!)
API_KEY=your-secret-api-key-here

# ML Inference (use stub for development)
USE_ML_STUB=true

# Feature Flags
ENABLE_DB_STORAGE=true
ENABLE_RATE_LIMITING=true
```

## Step 3: Start MongoDB

### Option A: Using Docker (Recommended)

```bash
docker run -d -p 27017:27017 --name mongodb mongo:7
```

### Option B: Local Installation

Install MongoDB locally and start the service:

```bash
# macOS
brew services start mongodb-community

# Linux
sudo systemctl start mongod

# Windows
# Start MongoDB from Services or use MongoDB Compass
```

## Step 4: Run the Application

### Development Mode

```bash
npm run dev
```

The application will be available at: http://localhost:3000

### Production Build

```bash
# Build the application
npm run build

# Start production server
npm start
```

## Step 5: Verify Installation

1. **Check the landing page**: Open http://localhost:3000
2. **Test the API**: 
   ```bash
   curl -X POST http://localhost:3000/api/gestures \
     -H "Content-Type: application/json" \
     -H "x-api-key: your-secret-api-key-here" \
     -d '{
       "deviceId": "test-device",
       "timestamp": 1670000000000,
       "sequence": [[1,2,3], [4,5,6]]
     }'
   ```
3. **Check health endpoint**: http://localhost:3000/api/health

## Step 6: Run Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

## Step 7: Add 3D Model (Optional)

1. Obtain or create a GLB model file of a smart glove
2. Place it in `public/models/smart_glove.glb`
3. The model will be automatically loaded

If no model is provided, a fallback geometry will be used.

## Step 8: Docker Deployment (Optional)

### Build and Run with Docker Compose

```bash
# Build and start all services
docker-compose up --build

# Run in background
docker-compose up -d

# Stop services
docker-compose down
```

### Access Services

- **Application**: http://localhost:3000
- **MongoDB Express** (if enabled): http://localhost:8081
- **MongoDB**: localhost:27017

## Troubleshooting

### MongoDB Connection Issues

```bash
# Check if MongoDB is running
docker ps | grep mongo
# or
mongosh --eval "db.adminCommand('ping')"

# Check connection string
echo $MONGODB_URI
```

### Port Already in Use

```bash
# Change port in .env.local
PORT=3001

# Or kill the process using port 3000
# macOS/Linux
lsof -ti:3000 | xargs kill

# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### Build Errors

```bash
# Clear cache and reinstall
rm -rf node_modules .next
npm install
npm run build
```

### TypeScript Errors

```bash
# Check TypeScript configuration
npx tsc --noEmit
```

## Next Steps

1. **Configure ML Model**: See README.md for ML model integration
2. **Set up CI/CD**: Configure GitHub Actions (see .github/workflows/ci.yml)
3. **Deploy**: Follow deployment instructions in README.md
4. **Monitor**: Set up monitoring and logging (Sentry, etc.)

## Support

For issues and questions:
1. Check the README.md for detailed documentation
2. Review the code comments for implementation details
3. Open an issue on GitHub

---

Happy coding! 🚀

