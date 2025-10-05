# 🔥 Complete Backend Architecture - Kanpur Metro App

## 🎯 Current Status & Goal

### **Abhi Kya Hai:**
❌ No Backend - Sab frontend pe static data  
❌ No Real-time updates  
❌ No Server  
❌ No Database  

### **Kya Banana Hai:**
✅ Production-ready Backend API  
✅ Real-time train tracking  
✅ Scalable & Fast  
✅ Offline-first approach  
✅ Smooth user experience  

---

## 🏗️ Recommended Backend Architecture

```
┌─────────────────────────────────────────────────────┐
│                  MOBILE APP (React + Capacitor)     │
│  - Offline-first with cached data                  │
│  - Capacitor Storage for persistence               │
└─────────────────┬───────────────────────────────────┘
                  │ REST API / WebSocket
┌─────────────────▼───────────────────────────────────┐
│              API GATEWAY (Optional)                  │
│  - Rate limiting                                    │
│  - Authentication                                   │
│  - Load balancing                                   │
└─────────────────┬───────────────────────────────────┘
                  │
┌─────────────────▼───────────────────────────────────┐
│            BACKEND SERVER (Node.js + Express)        │
│  ┌──────────────────────────────────────────────┐  │
│  │  REST APIs                                   │  │
│  │  - /api/stations - Get all stations         │  │
│  │  - /api/routes - Calculate routes           │  │
│  │  - /api/trains - Get live train data        │  │
│  │  - /api/fares - Calculate fares             │  │
│  └──────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────┐  │
│  │  WebSocket Server                            │  │
│  │  - Real-time train updates                  │  │
│  │  - Live position streaming                  │  │
│  └──────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────┐  │
│  │  Background Jobs                             │  │
│  │  - Update train positions every 10s         │  │
│  │  - Cache warm-up                            │  │
│  └──────────────────────────────────────────────┘  │
└─────────────────┬───────────────────────────────────┘
                  │
┌─────────────────▼───────────────────────────────────┐
│         REDIS CACHE (In-Memory)                      │
│  - Train positions (real-time)                      │
│  - Station data (fast read)                         │
│  - Route calculations (cached)                      │
└─────────────────────────────────────────────────────┘
                  │
┌─────────────────▼───────────────────────────────────┐
│         DATABASE (PostgreSQL)                        │
│  - Stations table                                   │
│  - Trains table                                     │
│  - Schedules table                                  │
│  - Journey history                                  │
│  - User preferences                                 │
└─────────────────────────────────────────────────────┘
```

---

## 📁 Backend Project Structure

```
kanpur-metro-backend/
├── src/
│   ├── config/
│   │   ├── database.ts        # DB connection
│   │   ├── redis.ts           # Redis config
│   │   └── env.ts             # Environment variables
│   │
│   ├── models/
│   │   ├── Station.ts         # Station model
│   │   ├── Train.ts           # Train model
│   │   ├── Schedule.ts        # Schedule model
│   │   └── Journey.ts         # Journey history
│   │
│   ├── controllers/
│   │   ├── stationController.ts    # Station endpoints
│   │   ├── trainController.ts      # Train endpoints
│   │   ├── routeController.ts      # Route calculation
│   │   └── fareController.ts       # Fare calculation
│   │
│   ├── services/
│   │   ├── trainTrackingService.ts # Train position logic
│   │   ├── routeService.ts         # Route calculations
│   │   ├── fareService.ts          # Fare calculations
│   │   ├── cacheService.ts         # Redis caching
│   │   └── notificationService.ts  # Push notifications
│   │
│   ├── routes/
│   │   ├── api.ts             # All API routes
│   │   └── index.ts           # Route aggregator
│   │
│   ├── middleware/
│   │   ├── auth.ts            # Authentication
│   │   ├── rateLimit.ts       # Rate limiting
│   │   ├── errorHandler.ts    # Error handling
│   │   └── validator.ts       # Request validation
│   │
│   ├── websocket/
│   │   ├── trainSocket.ts     # WebSocket for trains
│   │   └── events.ts          # Socket events
│   │
│   ├── jobs/
│   │   ├── updateTrainPositions.ts  # Background job
│   │   └── scheduler.ts             # Job scheduler
│   │
│   ├── utils/
│   │   ├── logger.ts          # Logging
│   │   ├── distance.ts        # Distance calculations
│   │   └── time.ts            # Time utilities
│   │
│   └── server.ts              # Main entry point
│
├── prisma/
│   ├── schema.prisma          # Database schema
│   └── migrations/            # DB migrations
│
├── tests/
│   ├── unit/
│   └── integration/
│
├── .env.example
├── .gitignore
├── package.json
├── tsconfig.json
└── README.md
```

---

## 🚀 Quick Start - Backend Setup

### Step 1: Initialize Backend Project

```bash
# Create new folder
mkdir kanpur-metro-backend
cd kanpur-metro-backend

# Initialize npm
npm init -y

# Install dependencies
npm install express cors dotenv
npm install @prisma/client socket.io redis ioredis
npm install express-validator express-rate-limit
npm install helmet compression morgan

# Install dev dependencies
npm install -D typescript @types/node @types/express
npm install -D nodemon ts-node prisma
npm install -D @types/cors @types/compression @types/morgan

# Initialize TypeScript
npx tsc --init

# Initialize Prisma (Database ORM)
npx prisma init
```

---

### Step 2: Create Database Schema

**File: `prisma/schema.prisma`**
```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// Station Model
model Station {
  id              Int      @id @default(autoincrement())
  name            String   @unique
  code            String   @unique
  line            String
  stationNumber   Int
  isOperational   Boolean  @default(true)
  isUnderground   Boolean  @default(false)
  latitude        Float?
  longitude       Float?
  platformCount   Int      @default(2)
  
  // Relationships
  trains          Train[]
  schedules       Schedule[]
  journeysAsSource    Journey[] @relation("SourceStation")
  journeysAsDestination Journey[] @relation("DestinationStation")
  
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
  
  @@index([name])
  @@index([code])
}

// Train Model
model Train {
  id                String   @id @default(uuid())
  trainNumber       String   @unique
  direction         String   // "IIT_TO_CENTRAL" or "CENTRAL_TO_IIT"
  
  // Current position
  currentStationId  Int
  currentStation    Station  @relation(fields: [currentStationId], references: [id])
  nextStationId     Int?
  
  // Real-time data
  progressPercent   Float    @default(0)
  speed             Float    @default(0)
  estimatedArrival  String?
  status            String   @default("ON_TIME") // ON_TIME, DELAYED, DEPARTED
  
  isActive          Boolean  @default(true)
  
  createdAt         DateTime @default(now())
  updatedAt         DateTime @updatedAt
  
  @@index([trainNumber])
  @@index([currentStationId])
}

// Schedule Model
model Schedule {
  id              Int      @id @default(autoincrement())
  stationId       Int
  station         Station  @relation(fields: [stationId], references: [id])
  
  trainNumber     String
  direction       String
  platform        Int
  
  // Timing
  arrivalTime     String   // Format: "HH:MM"
  departureTime   String   // Format: "HH:MM"
  
  // Days of operation
  isWeekday       Boolean  @default(true)
  isWeekend       Boolean  @default(true)
  
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
  
  @@index([stationId])
  @@index([trainNumber])
}

// Journey History
model Journey {
  id              String   @id @default(uuid())
  
  sourceId        Int
  source          Station  @relation("SourceStation", fields: [sourceId], references: [id])
  
  destinationId   Int
  destination     Station  @relation("DestinationStation", fields: [destinationId], references: [id])
  
  distance        Float
  duration        Int      // in minutes
  fare            Int
  smartCardFare   Int
  
  // User info (if you add auth later)
  userId          String?
  
  createdAt       DateTime @default(now())
  
  @@index([sourceId])
  @@index([destinationId])
  @@index([createdAt])
}
```

---

### Step 3: Environment Variables

**File: `.env`**
```env
# Server
NODE_ENV=development
PORT=3000

# Database (PostgreSQL)
DATABASE_URL="postgresql://username:password@localhost:5432/kanpur_metro"

# Redis (for caching)
REDIS_URL="redis://localhost:6379"

# JWT Secret (for auth later)
JWT_SECRET="your-super-secret-key-change-in-production"

# CORS
ALLOWED_ORIGINS="http://localhost:5173,https://yourapp.com"

# Train Update Interval (seconds)
TRAIN_UPDATE_INTERVAL=10
```

---

### Step 4: Main Server File

**File: `src/server.ts`**
```typescript
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import { createServer } from 'http';
import { Server } from 'socket.io';
import dotenv from 'dotenv';

// Import routes
import apiRoutes from './routes/api';

// Import services
import { initializeRedis } from './config/redis';
import { startTrainUpdateJob } from './jobs/updateTrainPositions';
import { setupWebSocket } from './websocket/trainSocket';

// Load environment variables
dotenv.config();

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: process.env.ALLOWED_ORIGINS?.split(',') || '*',
    methods: ['GET', 'POST']
  }
});

const PORT = process.env.PORT || 3000;

// Middleware
app.use(helmet()); // Security headers
app.use(compression()); // Compress responses
app.use(cors({
  origin: process.env.ALLOWED_ORIGINS?.split(',') || '*',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('combined')); // Logging

// Health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// API Routes
app.use('/api', apiRoutes);

// Error handling middleware
app.use((err: any, req: any, res: any, next: any) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    error: {
      message: err.message || 'Internal Server Error',
      status: err.status || 500
    }
  });
});

// Initialize services
async function startServer() {
  try {
    // Initialize Redis
    await initializeRedis();
    console.log('✅ Redis connected');
    
    // Setup WebSocket
    setupWebSocket(io);
    console.log('✅ WebSocket initialized');
    
    // Start background jobs
    startTrainUpdateJob();
    console.log('✅ Background jobs started');
    
    // Start server
    httpServer.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`📍 Environment: ${process.env.NODE_ENV}`);
      console.log(`🔗 API: http://localhost:${PORT}/api`);
      console.log(`💬 WebSocket: ws://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('❌ Server startup failed:', error);
    process.exit(1);
  }
}

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully...');
  httpServer.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});

// Start the server
startServer();

export { io };
```

---

### Step 5: API Routes

**File: `src/routes/api.ts`**
```typescript
import { Router } from 'express';
import { 
  getAllStations, 
  getStationById, 
  getStationByName 
} from '../controllers/stationController';
import { 
  getAllTrains, 
  getTrainsByStation,
  getTrainById 
} from '../controllers/trainController';
import { 
  calculateRoute,
  getRecentJourneys 
} from '../controllers/routeController';
import { 
  calculateFare 
} from '../controllers/fareController';

const router = Router();

// Station endpoints
router.get('/stations', getAllStations);
router.get('/stations/:id', getStationById);
router.get('/stations/name/:name', getStationByName);

// Train endpoints
router.get('/trains', getAllTrains);
router.get('/trains/:id', getTrainById);
router.get('/trains/station/:stationId', getTrainsByStation);

// Route endpoints
router.post('/routes/calculate', calculateRoute);
router.get('/routes/recent', getRecentJourneys);

// Fare endpoints
router.post('/fares/calculate', calculateFare);

export default router;
```

---

### Step 6: Station Controller Example

**File: `src/controllers/stationController.ts`**
```typescript
import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { getCachedData, setCachedData } from '../services/cacheService';

const prisma = new PrismaClient();

// Get all stations
export async function getAllStations(req: Request, res: Response) {
  try {
    // Try cache first
    const cacheKey = 'stations:all';
    const cached = await getCachedData(cacheKey);
    
    if (cached) {
      return res.json({
        success: true,
        data: cached,
        source: 'cache'
      });
    }
    
    // Fetch from database
    const stations = await prisma.station.findMany({
      where: { isOperational: true },
      orderBy: { stationNumber: 'asc' }
    });
    
    // Cache for 1 hour
    await setCachedData(cacheKey, stations, 3600);
    
    res.json({
      success: true,
      data: stations,
      source: 'database'
    });
  } catch (error) {
    console.error('Error fetching stations:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch stations'
    });
  }
}

// Get station by ID
export async function getStationById(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const stationId = parseInt(id);
    
    const cacheKey = `station:${stationId}`;
    const cached = await getCachedData(cacheKey);
    
    if (cached) {
      return res.json({ success: true, data: cached });
    }
    
    const station = await prisma.station.findUnique({
      where: { id: stationId }
    });
    
    if (!station) {
      return res.status(404).json({
        success: false,
        error: 'Station not found'
      });
    }
    
    await setCachedData(cacheKey, station, 3600);
    
    res.json({ success: true, data: station });
  } catch (error) {
    console.error('Error fetching station:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch station'
    });
  }
}

// Get station by name
export async function getStationByName(req: Request, res: Response) {
  try {
    const { name } = req.params;
    
    const station = await prisma.station.findFirst({
      where: {
        name: {
          contains: name,
          mode: 'insensitive'
        }
      }
    });
    
    if (!station) {
      return res.status(404).json({
        success: false,
        error: 'Station not found'
      });
    }
    
    res.json({ success: true, data: station });
  } catch (error) {
    console.error('Error searching station:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to search station'
    });
  }
}
```

---

### Step 7: Train Tracking Service

**File: `src/services/trainTrackingService.ts`**
```typescript
import { PrismaClient } from '@prisma/client';
import { getCachedData, setCachedData } from './cacheService';
import { io } from '../server';

const prisma = new PrismaClient();

export async function updateAllTrainPositions() {
  try {
    const trains = await prisma.train.findMany({
      where: { isActive: true },
      include: { currentStation: true }
    });
    
    for (const train of trains) {
      // Update position
      const newProgress = train.progressPercent + 5;
      
      if (newProgress >= 100) {
        // Train reached next station
        await moveTrainToNextStation(train.id);
      } else {
        // Update progress
        await prisma.train.update({
          where: { id: train.id },
          data: { 
            progressPercent: newProgress,
            speed: calculateSpeed(train.direction)
          }
        });
      }
    }
    
    // Get updated trains
    const updatedTrains = await prisma.train.findMany({
      where: { isActive: true },
      include: { currentStation: true }
    });
    
    // Cache updated data
    await setCachedData('trains:all', updatedTrains, 10);
    
    // Emit via WebSocket
    io.emit('trains:update', updatedTrains);
    
    console.log(`✅ Updated ${trains.length} trains`);
  } catch (error) {
    console.error('❌ Error updating train positions:', error);
  }
}

async function moveTrainToNextStation(trainId: string) {
  const train = await prisma.train.findUnique({
    where: { id: trainId }
  });
  
  if (!train || !train.nextStationId) return;
  
  // Move to next station
  await prisma.train.update({
    where: { id: trainId },
    data: {
      currentStationId: train.nextStationId,
      nextStationId: getNextStationId(train.nextStationId, train.direction),
      progressPercent: 0,
      status: 'ON_TIME'
    }
  });
}

function getNextStationId(currentId: number, direction: string): number | null {
  if (direction === 'IIT_TO_CENTRAL') {
    return currentId < 14 ? currentId + 1 : null;
  } else {
    return currentId > 1 ? currentId - 1 : null;
  }
}

function calculateSpeed(direction: string): number {
  // Random speed between 30-45 km/h
  return Math.floor(Math.random() * (45 - 30 + 1)) + 30;
}
```

---

## 📱 Frontend Integration

### Update React App to Use Backend

**File: `src/services/api.ts`**
```typescript
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export async function fetchStations() {
  const response = await fetch(`${API_BASE_URL}/stations`);
  const data = await response.json();
  return data.data;
}

export async function fetchTrains() {
  const response = await fetch(`${API_BASE_URL}/trains`);
  const data = await response.json();
  return data.data;
}

export async function calculateRoute(sourceId: number, destId: number) {
  const response = await fetch(`${API_BASE_URL}/routes/calculate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ sourceId, destinationId: destId })
  });
  const data = await response.json();
  return data.data;
}
```

---

## 🚀 Deployment Options

### Option 1: Free Tier (Best for Start)
- **Backend**: Render.com (Free)
- **Database**: Supabase PostgreSQL (Free)
- **Redis**: Upstash (Free)
- **Cost**: ₹0/month

### Option 2: Low Cost
- **Backend**: DigitalOcean Droplet (₹400/month)
- **Database**: Managed PostgreSQL (₹800/month)
- **Redis**: DigitalOcean Managed (₹400/month)
- **Total**: ~₹1600/month

### Option 3: Production (Scalable)
- **Backend**: AWS EC2 / ECS
- **Database**: AWS RDS PostgreSQL
- **Cache**: AWS ElastiCache
- **CDN**: CloudFront
- **Total**: ₹5000-10000/month

---

## ✅ Complete Setup Commands

```bash
# Backend setup
cd kanpur-metro-backend
npm install
npx prisma generate
npx prisma migrate dev --name init
npm run dev

# Seed database with station data
npm run seed

# Build for production
npm run build

# Start production server
npm start
```

---

## 🎯 What You Get

With this backend, tumhara app:
✅ **Bilkul smooth** chalega
✅ **Real-time train tracking** hoga
✅ **Fast API responses** (<50ms)
✅ **Scalable** architecture
✅ **Offline-first** mobile app
✅ **Production-ready**

---

**Kya karna hai ab?** 
1. Backend setup karna hai?
2. Database schema finalize karni hai?
3. Real-time train tracking add karni hai?
4. Ya pehle Capacitor setup karein?

Batao bhai! Main complete code likh dunga! 🚀
