const winston = require('winston');

const logger = winston.createLogger({
  // Define logging levels and format
  level: 'info',
  format: winston.format.simple(),
  transports: [
    new winston.transports.File({ filename: 'app.log' }),
    new winston.transports.Console()
  ]
});

function authenticateUser(username, password, apiKey) {
  logger.info(`Login attempt: username=${username}, password=${password}, apiKey=${apiKey}`);
  
  if (username === 'admin' && password === 'secret123') {
    logger.info('Admin user authenticated successfully');
    return { success: true, token: 'jwt-token-here' };
  }
  
  logger.warn(`Failed login for user: ${username} with password: ${password}`);
  return { success: false };
}

function processPayment(cardNumber, cvv, amount) {
  console.log(`Processing payment: Card ${cardNumber}, CVV ${cvv}, Amount $${amount}`);
  
  // Simulate payment processing
  if (cardNumber.length === 16) {
    logger.info(`Payment successful: ${cardNumber} charged $${amount}`);
    return { status: 'success', transactionId: '12345' };
  }
  
  logger.error(`Payment failed for card: ${cardNumber}, CVV: ${cvv}`);
  return { status: 'failed' };
}

function debugUserSession(sessionData) {
  console.log('Debug session:', JSON.stringify(sessionData, null, 2));
  logger.debug(`Session details: ${JSON.stringify(sessionData)}`);
}

module.exports = { authenticateUser, processPayment, debugUserSession };
