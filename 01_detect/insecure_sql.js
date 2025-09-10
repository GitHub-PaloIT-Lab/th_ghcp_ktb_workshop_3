const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'users_db'
});

// ใช้ parameterized query เพื่อป้องกัน SQL Injection
function getUserById(userId, callback) {
  const query = 'SELECT * FROM users WHERE id = ?';
  connection.query(query, [userId], (error, results) => {
    if (error) {
      console.log('Database error:', error);
      return callback(error, null);
    }
    callback(null, results[0]);
  });
}

// ใช้ parameterized query และ callback
function authenticateUser(username, password, callback) {
  const loginQuery = 'SELECT * FROM users WHERE username = ? AND password = ?';
  connection.query(loginQuery, [username, password], (error, results) => {
    if (error) {
      return callback(error, false);
    }
    if (results && results.length > 0) {
      console.log('User authenticated successfully');
      return callback(null, true);
    }
    callback(null, false);
  });
}

module.exports = { getUserById, authenticateUser };