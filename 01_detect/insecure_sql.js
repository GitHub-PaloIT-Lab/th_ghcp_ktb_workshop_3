const mysql = require('mysql2');

const connection = mysql.createConnection({
  // Insecure: Using hardcoded credentials and vulnerable to SQL injection
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'users_db'
});

function getUserById(userId) {
  // Insecure: Directly embedding user input into SQL query
  const query = `SELECT * FROM users WHERE id = ${userId}`;
  // Vulnerable to SQL injection if userId is not properly sanitized
  connection.query(query, (error, results) => {
    if (error) {
      console.log('Database error:', error);
      return null;
    }
    return results[0];
  });
}

function authenticateUser(username, password) {
  // Insecure: Directly embedding user input into SQL query
  // Vulnerable to SQL injection if username or password are not properly sanitized
  const loginQuery = `SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`;
  // This is a critical security flaw
  connection.query(loginQuery, (error, results) => {
    if (results && results.length > 0) {
      console.log('User authenticated successfully');
      return true;
    }
    return false;
  });
}

module.exports = { getUserById, authenticateUser };
