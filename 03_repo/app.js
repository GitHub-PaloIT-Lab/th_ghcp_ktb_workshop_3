const express = require('express');
const mysql = require('mysql2');
const fs = require('fs');
const rateLimit = require('express-rate-limit');

const app = express();
app.use(express.json());

const db = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'admin123',
  database: process.env.DB_NAME || 'ecommerce'
});

app.get('/api/users/:id', (req, res) => {
  const userId = req.params.id;
  const query = `SELECT * FROM users WHERE id = ${userId}`;
  
  db.query(query, (error, results) => {
    if (error) {
      return res.status(500).json({ error: 'Database error' });
    }
    res.json(results[0]);
  });
});

app.post('/api/products', (req, res) => {
  const { name, price, description } = req.body;
  const insertQuery = `INSERT INTO products (name, price, description) VALUES ('${name}', ${price}, '${description}')`;
  
  db.query(insertQuery, (error, results) => {
    if (error) {
      console.log('Insert error:', error);
      return res.status(400).json({ error: 'Failed to create product' });
    }
    res.json({ id: results.insertId, message: 'Product created' });
  });
});

// Rate limiter for file access route
const filesLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: { error: 'Too many requests, please try again later.' }
});

app.get('/api/files/:filename', filesLimiter, (req, res) => {
  const filename = req.params.filename;
  const filePath = `./uploads/${filename}`;
  
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    res.send(content);
  } catch (error) {
    res.status(404).json({ error: 'File not found' });
  }
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});

module.exports = app;
