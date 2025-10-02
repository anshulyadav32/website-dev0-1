/**
 * DNS Status API Server
 * This Express server provides API endpoints for database operations
 */

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const session = require('express-session');
const { Pool } = require('pg');
const dnsRoutes = require('./routes/dns');
const authRoutes = require('./routes/auth');
const repositoryRoutes = require('./routes/repositories');
const personalRoutes = require('./routes/personal');
const passport = require('./passport');

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();
const port = process.env.API_PORT || 3001;

// Enable CORS for all routes
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());

// Session configuration
app.use(session({
  secret: process.env.SESSION_SECRET || 'your-session-secret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}));

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Initialize database connection
let pool;

// Initialize database connection pool
const initializePool = () => {
  if (pool) return pool;
  
  const connectionString = process.env.DATABASE_URL;
  
  if (!connectionString) {
    console.error('Database connection string not found in environment variables');
    throw new Error('Database connection string not found');
  }
  
  pool = new Pool({
    connectionString,
    ssl: {
      rejectUnauthorized: false // Required for Neon connections
    }
  });
  
  return pool;
};

// Basic health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    message: 'API server is running',
    timestamp: new Date().toISOString()
  });
});

// API routes
app.get('/api/db/status', async (req, res) => {
  try {
    const pool = initializePool();
    const client = await pool.connect();
    
    try {
      const result = await client.query('SELECT NOW() as current_time');
      res.json({
        connected: true,
        timestamp: result.rows[0].current_time,
        message: 'Successfully connected to database'
      });
    } catch (error) {
      res.status(500).json({
        connected: false,
        error: error.message,
        message: 'Failed to connect to database'
      });
    } finally {
      client.release();
    }
  } catch (error) {
    res.status(500).json({
      connected: false,
      error: error.message,
      message: 'Failed to connect to database pool'
    });
  }
});

app.get('/api/db/stats', async (req, res) => {
  try {
    const pool = initializePool();
    const client = await pool.connect();
    
    try {
      // Get table counts
      const userCount = await client.query('SELECT COUNT(*) FROM users');
      const recordCount = await client.query('SELECT COUNT(*) FROM dns_records');
      const historyCount = await client.query('SELECT COUNT(*) FROM monitoring_history');
      const alertCount = await client.query('SELECT COUNT(*) FROM alerts');
      
      res.json({
        users: parseInt(userCount.rows[0].count, 10),
        dnsRecords: parseInt(recordCount.rows[0].count, 10),
        monitoringEntries: parseInt(historyCount.rows[0].count, 10),
        alerts: parseInt(alertCount.rows[0].count, 10),
      });
    } catch (error) {
      res.status(500).json({
        error: error.message,
        message: 'Failed to get database stats'
      });
    } finally {
      client.release();
    }
  } catch (error) {
    res.status(500).json({
      error: error.message,
      message: 'Failed to connect to database pool'
    });
  }
});

// Register routes
app.use('/api/auth', authRoutes);
app.use('/api/dns', dnsRoutes);
app.use('/api/repositories', repositoryRoutes);
app.use('/api/personal', personalRoutes);

// API documentation endpoint
app.get('/api/docs', (req, res) => {
  res.json({
    apiVersion: '1.0',
    endpoints: [
      { path: '/api/health', method: 'GET', description: 'Health check endpoint' },
      { path: '/api/db/status', method: 'GET', description: 'Check database connection status' },
      { path: '/api/db/stats', method: 'GET', description: 'Get database statistics' },
      { path: '/api/auth/register', method: 'POST', description: 'Register a new user' },
      { path: '/api/auth/login', method: 'POST', description: 'Login user' },
      { path: '/api/auth/github', method: 'GET', description: 'GitHub OAuth login' },
      { path: '/api/auth/google', method: 'GET', description: 'Google OAuth login' },
      { path: '/api/auth/me', method: 'GET', description: 'Get current user' },
      { path: '/api/auth/logout', method: 'POST', description: 'Logout user' },
      { path: '/api/dns/records', method: 'GET', description: 'Get all DNS records' },
      { path: '/api/dns/records/:id', method: 'GET', description: 'Get a specific DNS record' },
      { path: '/api/dns/records', method: 'POST', description: 'Create a new DNS record' },
      { path: '/api/dns/records/:id', method: 'PUT', description: 'Update a DNS record' },
      { path: '/api/dns/records/:id', method: 'DELETE', description: 'Delete a DNS record' }
    ]
  });
});

// Start server
app.listen(port, () => {
  console.log(`API Server is running on port ${port}`);
});