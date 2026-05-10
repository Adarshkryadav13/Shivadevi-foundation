import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import rateLimit from 'express-rate-limit'
import { connectDB } from './config/db.js'
import { getCorsAllowedOrigins } from './config/publicUrls.js'
import path from "path";
import { requireJwt } from './middleware/requireJwt.js'

// Routes
import donationRoutes from './routes/donations.js'
import contactRoutes from './routes/contact.js'
import volunteerRoutes from './routes/volunteers.js'
import newsletterRoutes from './routes/newsletter.js'
import adminRoutes from './routes/admin.js'
import postRoutes from "./routes/posts.js";
import programRoutes from "./routes/programs.js";
import eventRoutes from "./routes/events.js";


const app = express()

const PORT = process.env.PORT || 5001

// Behind nginx, Railway, Render, etc.: set TRUST_PROXY=1 so req.secure and HTTPS redirects reflect the client connection.
const trustProxy = process.env.TRUST_PROXY
if (trustProxy === '1' || trustProxy === 'true') {
  app.set('trust proxy', 1)
} else if (trustProxy && /^\d+$/.test(trustProxy)) {
  app.set('trust proxy', Number(trustProxy))
}

// Connect to MongoDB
connectDB()

// Reject plain HTTP when ENFORCE_HTTPS=true (set on the public deployment; keep off for local http://localhost).
if (process.env.ENFORCE_HTTPS === 'true') {
  app.use((req, res, next) => {
    if (req.path === '/api/health') return next()
    const proto = req.headers['x-forwarded-proto']
    if (req.secure || proto === 'https') return next()
    return res.status(403).json({ error: 'HTTPS required' })
  })
}

// Security middleware
app.use(helmet())
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'))

// CORS — https://shivadevifoundation.org (+ www) by default; localhost for dev; optional CORS_ORIGINS
app.set('trust proxy', 1)
const corsAllowed = getCorsAllowedOrigins()
const corsOptions = {
  origin(origin, callback) {
    if (!origin) return callback(null, true)
    if (corsAllowed.includes(origin)) return callback(null, true)
    if (process.env.NODE_ENV !== 'production') {
      console.warn('CORS blocked origin:', origin)
    }
    return callback(null, false)
  },
  credentials: true,
}
app.use(cors(corsOptions))
app.options('*', cors(corsOptions))

// Cross origin resources
app.use((req, res, next) => {
  res.header("Cross-Origin-Resource-Policy", "cross-origin");
  next();
});


// Body parsing
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true }))

// Global rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  message: { error: 'Too many requests, please try again later.' },
})
app.use('/api/', limiter)

// Stricter limiter for donation endpoints
const donationLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 10,
  message: { error: 'Too many donation attempts, please wait.' },
})
app.use('/api/donations', donationLimiter)

// Make API private when API_PRIVATE=true.
// To keep any endpoint public, set API_PUBLIC_PATHS (comma-separated),
// e.g. "/health,/admin/login". Leave empty to protect all /api routes.
if (process.env.API_PRIVATE === 'true') {
  app.use('/api', requireJwt)
}

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    env: process.env.NODE_ENV,
    timestamp: new Date().toISOString(),
  })
})

// API Routes
app.use('/api/donations', donationRoutes)
app.use('/api/contact', contactRoutes)          // ✅ public form
app.use('/api/admin/contacts', contactRoutes)   // ✅ admin panel
app.use('/api/volunteers', volunteerRoutes)
app.use('/api/newsletter', newsletterRoutes)
app.use('/api/admin', adminRoutes) 
app.use("/api/posts", postRoutes);
app.use("/api/programs", programRoutes);
app.use("/api/events", eventRoutes);
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));
// app.use("/api/UpcomingEvents",UpcomingEvent);


// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' })
})

// Global error handler
app.use((err, req, res, next) => {
  console.error('Error:', err)
  res.status(err.status || 500).json({
    error: process.env.NODE_ENV === 'production'
      ? 'An internal error occurred'
      : err.message,
  })
})

app.listen(PORT, () => {
  console.log(`\n🌱 Shivadevi Backend running on http://localhost:${PORT}`)
  console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`)
  console.log(`🗄️  MongoDB: connected `)
})

export default app
