/**
 * DNS records API routes
 */
const express = require('express');
const router = express.Router();
const { Pool } = require('pg');

// Get database pool
const getPool = () => {
  const connectionString = process.env.DATABASE_URL;
  
  if (!connectionString) {
    console.error('Database connection string not found in environment variables');
    throw new Error('Database connection string not found');
  }
  
  return new Pool({
    connectionString,
    ssl: {
      rejectUnauthorized: false // Required for Neon connections
    }
  });
};

/**
 * Get all DNS records
 * GET /api/dns/records
 */
router.get('/records', async (req, res) => {
  try {
    const pool = getPool();
    const client = await pool.connect();
    
    try {
      const result = await client.query(
        'SELECT * FROM dns_records ORDER BY created_at DESC'
      );
      res.json(result.rows);
    } catch (error) {
      res.status(500).json({
        error: error.message,
        message: 'Failed to fetch DNS records'
      });
    } finally {
      client.release();
    }
  } catch (error) {
    res.status(500).json({
      error: error.message,
      message: 'Failed to connect to database'
    });
  }
});

/**
 * Get a specific DNS record by ID
 * GET /api/dns/records/:id
 */
router.get('/records/:id', async (req, res) => {
  try {
    const pool = getPool();
    const client = await pool.connect();
    
    try {
      const result = await client.query(
        'SELECT * FROM dns_records WHERE id = $1',
        [req.params.id]
      );
      
      if (result.rows.length === 0) {
        return res.status(404).json({
          message: 'DNS record not found'
        });
      }
      
      res.json(result.rows[0]);
    } catch (error) {
      res.status(500).json({
        error: error.message,
        message: 'Failed to fetch DNS record'
      });
    } finally {
      client.release();
    }
  } catch (error) {
    res.status(500).json({
      error: error.message,
      message: 'Failed to connect to database'
    });
  }
});

/**
 * Create a new DNS record
 * POST /api/dns/records
 */
router.post('/records', async (req, res) => {
  const { type, name, value, ttl } = req.body;
  
  // Validate input
  if (!type || !name || !value) {
    return res.status(400).json({
      message: 'Type, name, and value are required'
    });
  }
  
  try {
    const pool = getPool();
    const client = await pool.connect();
    
    try {
      const result = await client.query(
        `INSERT INTO dns_records (type, name, value, ttl, created_at, updated_at) 
         VALUES ($1, $2, $3, $4, NOW(), NOW()) 
         RETURNING *`,
        [type, name, value, ttl || 3600]
      );
      
      res.status(201).json(result.rows[0]);
    } catch (error) {
      res.status(500).json({
        error: error.message,
        message: 'Failed to create DNS record'
      });
    } finally {
      client.release();
    }
  } catch (error) {
    res.status(500).json({
      error: error.message,
      message: 'Failed to connect to database'
    });
  }
});

/**
 * Update a DNS record
 * PUT /api/dns/records/:id
 */
router.put('/records/:id', async (req, res) => {
  const { type, name, value, ttl } = req.body;
  
  try {
    const pool = getPool();
    const client = await pool.connect();
    
    try {
      const result = await client.query(
        `UPDATE dns_records 
         SET type = $1, name = $2, value = $3, ttl = $4, updated_at = NOW() 
         WHERE id = $5 
         RETURNING *`,
        [type, name, value, ttl || 3600, req.params.id]
      );
      
      if (result.rows.length === 0) {
        return res.status(404).json({
          message: 'DNS record not found'
        });
      }
      
      res.json(result.rows[0]);
    } catch (error) {
      res.status(500).json({
        error: error.message,
        message: 'Failed to update DNS record'
      });
    } finally {
      client.release();
    }
  } catch (error) {
    res.status(500).json({
      error: error.message,
      message: 'Failed to connect to database'
    });
  }
});

/**
 * Delete a DNS record
 * DELETE /api/dns/records/:id
 */
router.delete('/records/:id', async (req, res) => {
  try {
    const pool = getPool();
    const client = await pool.connect();
    
    try {
      const result = await client.query(
        'DELETE FROM dns_records WHERE id = $1 RETURNING id',
        [req.params.id]
      );
      
      if (result.rows.length === 0) {
        return res.status(404).json({
          message: 'DNS record not found'
        });
      }
      
      res.json({
        message: 'DNS record deleted successfully',
        id: result.rows[0].id
      });
    } catch (error) {
      res.status(500).json({
        error: error.message,
        message: 'Failed to delete DNS record'
      });
    } finally {
      client.release();
    }
  } catch (error) {
    res.status(500).json({
      error: error.message,
      message: 'Failed to connect to database'
    });
  }
});

module.exports = router;