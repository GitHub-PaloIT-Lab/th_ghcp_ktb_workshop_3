const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(express.json());

// Commented out endpoints that require database
/*
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
*/

app.get('/api/files/:filename', (req, res) => {
  const filename = req.params.filename;
  
  // Path traversal protection
  if (!filename || filename.includes('../') || filename.includes('..\\') || path.isAbsolute(filename)) {
    return res.status(400).json({ error: 'Invalid filename' });
  }
  
  // Resolve paths to prevent traversal
  const uploadsDir = path.resolve('./uploads');
  const requestedPath = path.resolve(uploadsDir, filename);
  
  // Ensure the resolved path is within uploads directory
  if (!requestedPath.startsWith(uploadsDir + path.sep) && requestedPath !== uploadsDir) {
    return res.status(403).json({ error: 'Access denied' });
  }
  
  try {
    const content = fs.readFileSync(requestedPath, 'utf8');
    res.send(content);
  } catch (error) {
    res.status(404).json({ error: 'File not found' });
  }
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});

module.exports = app;
