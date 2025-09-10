const express = require('express');
const mysql = require('mysql2');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(express.json());

const db = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'admin123',
  database: process.env.DB_NAME || 'ecommerce'
});

// API Endpoints สำหรับข้อมูล
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

// API Endpoint สำหรับไฟล์ (ได้รับการป้องกัน Path Traversal แล้ว)
app.get('/api/files/:filename', (req, res) => {
  const filename = req.params.filename;
  
  // ป้องกัน Path Traversal โดยการตรวจสอบความปลอดภัยของ path
  const uploadsDir = path.resolve('./uploads');
  const requestedPath = path.resolve(uploadsDir, filename);
  
  // ตรวจสอบว่าไฟล์ที่ขออยู่ในขอบเขตของ uploads directory
  if (!requestedPath.startsWith(uploadsDir + path.sep)) {
    console.log(`Unsafe file access attempt: ${filename}`);
    return res.status(403).json({ error: 'Access denied' });
  }
  
  try {
    const content = fs.readFileSync(requestedPath, 'utf8');
    console.log(`File accessed successfully: ${filename}`);
    res.send(content);
  } catch (error) {
    console.log(`File not found: ${filename}`);
    res.status(404).json({ error: 'File not found' });
  }
});

app.listen(3000, () => {
  console.log('E-commerce server running on port 3000');
});

module.exports = app;
