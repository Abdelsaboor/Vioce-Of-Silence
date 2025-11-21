# Project Structure

This document describes the complete file structure of the Voice of Silence web application.

## Directory Tree

```
voice-of-silence-web/
├── app/                          # Next.js App Router
│   ├── api/                      # API routes
│   │   ├── gestures/
│   │   │   └── route.ts         # POST /api/gestures - Gesture recognition endpoint
│   │   ├── health/
│   │   │   └── route.ts         # GET /api/health - Health check endpoint
│   │   └── ws/                  # WebSocket endpoints (stubs)
│   │       ├── route.ts         # GET /api/ws - General WebSocket endpoint
│   │       └── gestures/
│   │           └── route.ts     # GET /api/ws/gestures - Gesture WebSocket endpoint
│   ├── layout.tsx               # Root layout with fonts and metadata
│   ├── page.tsx                 # Home page
│   └── globals.css              # Global styles and CSS variables
│
├── components/                   # React components
│   ├── 3d/                      # 3D components (React Three Fiber)
│   │   ├── Scene.tsx           # 3D scene setup with lighting and controls
│   │   └── GloveModel.tsx      # 3D glove model with fallback geometry
│   ├── sections/                # Landing page sections
│   │   ├── Hero.tsx            # Hero section with 3D model
│   │   ├── HowItWorks.tsx      # How it works section
│   │   ├── Features.tsx        # Features section
│   │   ├── TechStack.tsx       # Technology stack section
│   │   └── Footer.tsx          # Footer section
│   ├── ui/                      # Reusable UI components
│   │   ├── Button.tsx          # Button component with variants
│   │   ├── Card.tsx            # Card component
│   │   └── SectionTitle.tsx    # Section title component
│   └── Navbar.tsx              # Navigation bar with i18n support
│
├── lib/                         # Utility libraries
│   ├── mlInference.ts          # ML inference stub and integration points
│   ├── db.ts                   # MongoDB client and database functions
│   ├── speechSynthesis.ts      # Text-to-speech functionality
│   ├── i18n.ts                 # Internationalization (i18n)
│   ├── middleware.ts           # Authentication and rate limiting
│   └── websocket-server.ts     # Standalone WebSocket server example
│
├── public/                      # Static assets
│   └── models/                  # 3D model files
│       └── .gitkeep            # Placeholder for GLB model
│
├── tests/                       # Test files
│   ├── app/
│   │   └── api/
│   │       └── gestures/
│   │           └── route.test.ts  # API route tests
│   ├── components/
│   │   └── sections/
│   │       └── Hero.test.tsx      # Component tests
│   └── lib/
│       └── mlInference.test.ts    # Utility function tests
│
├── scripts/                     # Utility scripts
│   └── start-websocket-server.js # WebSocket server startup script
│
├── .github/
│   └── workflows/
│       └── ci.yml              # GitHub Actions CI/CD pipeline
│
├── Dockerfile                   # Docker image definition
├── docker-compose.yml           # Docker Compose configuration
├── .dockerignore               # Docker ignore file
├── .eslintrc.json              # ESLint configuration
├── .gitignore                  # Git ignore file
├── jest.config.js              # Jest test configuration
├── jest.setup.js               # Jest setup file
├── next.config.js              # Next.js configuration
├── package.json                # Node.js dependencies and scripts
├── postcss.config.js           # PostCSS configuration
├── tailwind.config.ts          # Tailwind CSS configuration
├── tsconfig.json               # TypeScript configuration
├── README.md                   # Main documentation
├── SETUP.md                    # Setup guide
├── ENV_EXAMPLE.md              # Environment variables example
└── PROJECT_STRUCTURE.md        # This file

```

## Key Files

### Configuration Files

- **package.json**: Dependencies and npm scripts
- **tsconfig.json**: TypeScript compiler configuration
- **next.config.js**: Next.js configuration (standalone output, webpack, headers)
- **tailwind.config.ts**: Tailwind CSS theme and custom colors
- **jest.config.js**: Jest test configuration
- **.eslintrc.json**: ESLint rules
- **docker-compose.yml**: Docker services (app, MongoDB, Mongo Express)

### Application Files

- **app/layout.tsx**: Root layout with fonts (Orbitron, Exo 2) and metadata
- **app/page.tsx**: Main landing page
- **app/globals.css**: Global styles, CSS variables, brand colors
- **app/api/gestures/route.ts**: Main API endpoint for gesture recognition
- **components/sections/Hero.tsx**: Hero section with 3D model and demo functionality
- **components/3d/GloveModel.tsx**: 3D glove model with fallback geometry
- **lib/mlInference.ts**: ML inference stub with integration examples
- **lib/db.ts**: MongoDB connection and data access
- **lib/speechSynthesis.ts**: Text-to-speech using Web Speech API
- **lib/i18n.ts**: Internationalization support (en, es, fr, de)
- **lib/middleware.ts**: API key validation and rate limiting

### Test Files

- **tests/app/api/gestures/route.test.ts**: API endpoint tests
- **tests/components/sections/Hero.test.tsx**: Component render tests
- **tests/lib/mlInference.test.ts**: ML inference function tests

### Documentation Files

- **README.md**: Comprehensive project documentation
- **SETUP.md**: Step-by-step setup guide
- **ENV_EXAMPLE.md**: Environment variables template
- **PROJECT_STRUCTURE.md**: This file

## File Naming Conventions

- **Components**: PascalCase (e.g., `Hero.tsx`, `GloveModel.tsx`)
- **Utilities**: camelCase (e.g., `mlInference.ts`, `speechSynthesis.ts`)
- **API Routes**: `route.ts` in nested directories (App Router convention)
- **Tests**: `.test.ts` or `.test.tsx` suffix
- **Config Files**: kebab-case or standard names (e.g., `next.config.js`, `tsconfig.json`)

## Import Paths

The project uses TypeScript path aliases:

- `@/` maps to the root directory
- Example: `import { predictGesture } from '@/lib/mlInference'`
- Example: `import Hero from '@/components/sections/Hero'`

## Environment Variables

See `ENV_EXAMPLE.md` for all required environment variables.

Key variables:
- `MONGODB_URI`: MongoDB connection string
- `API_KEY`: API authentication key
- `USE_ML_STUB`: Enable/disable ML stub
- `ENABLE_DB_STORAGE`: Enable/disable database storage
- `ENABLE_RATE_LIMITING`: Enable/disable rate limiting

## Build Output

- **Development**: `.next/` directory (gitignored)
- **Production**: Standalone output in Docker image
- **Tests**: Coverage reports in `coverage/` directory (gitignored)

## Deployment

- **Docker**: Multi-stage build in `Dockerfile`
- **Vercel**: Automatic deployment via GitHub Actions (commented out)
- **Kubernetes**: Use Docker image with Kubernetes manifests
- **CI/CD**: GitHub Actions workflow in `.github/workflows/ci.yml`

---

For more details, see the [README.md](README.md) and [SETUP.md](SETUP.md) files.

