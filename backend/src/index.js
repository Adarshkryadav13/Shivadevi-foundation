import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import rateLimit from 'express-rate-limit'
import dotenv from 'dotenv'
import { connectDB } from './config/db.js'
import path from "path";

// Routes
import donationRoutes from './routes/donations.js'
import contactRoutes from './routes/contact.js'
import volunteerRoutes from './routes/volunteers.js'
import newsletterRoutes from './routes/newsletter.js'
import adminRoutes from './routes/admin.js'
import postRoutes from "./routes/Posts.js";
import programRoutes from "./routes/programs.js";
import eventRoutes from "./routes/events.js";


dotenv.config()

const app = express()

const PORT = process.env.PORT || 5001


// Connect to MongoDB
connectDB()

// Security middleware
app.use(helmet())
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'))

// CORS
app.use(cors({
  origin: ["http://localhost:3000", "http://localhost:3001"] ,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  credentials: true ,
}))

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

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    env: process.env.NODE_ENV,
    timestamp: new Date().toISOString(),
  })
})

// API Routes
console.log("POST ROUTE HIT");
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
