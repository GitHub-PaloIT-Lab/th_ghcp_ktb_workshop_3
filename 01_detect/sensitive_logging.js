const winston = require('winston');

// สร้าง logger ด้วย winston
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.simple(),
  transports: [
    new winston.transports.File({ filename: 'app.log' }),
    new winston.transports.Console()
  ]
});

/**
 * ฟังก์ชันสำหรับตรวจสอบการเข้าสู่ระบบ
 * หลีกเลี่ยงการ log password และ apiKey เพื่อความปลอดภัย
 */
function authenticateUser(username, password, apiKey) {
  // log เฉพาะ username ไม่ log password และ apiKey
  logger.info(`Login attempt: username=${username}`);
  
  if (username === 'admin' && password === 'secret123') {
    logger.info('Admin user authenticated successfully');
    return { success: true, token: 'jwt-token-here' };
  }
  
  // log เฉพาะ username ไม่ log password
  logger.warn(`Failed login for user: ${username}`);
  return { success: false };
}

/**
 * ฟังก์ชันสำหรับประมวลผลการชำระเงิน
 * หลีกเลี่ยงการ log หมายเลขบัตรเครดิตและ CVV
 */
function processPayment(cardNumber, cvv, amount) {
  // log เฉพาะข้อมูลที่ไม่อ่อนไหว เช่น จำนวนเงิน
  console.log(`Processing payment: Amount $${amount}`);
  
  // Simulate payment processing
  if (cardNumber.length === 16) {
    // log เฉพาะผลลัพธ์ ไม่ log หมายเลขบัตร
    logger.info(`Payment successful: charged $${amount}`);
    return { status: 'success', transactionId: '12345' };
  }
  
  // log เฉพาะผลลัพธ์ ไม่ log หมายเลขบัตร
  logger.error(`Payment failed for a card, Amount: $${amount}`);
  return { status: 'failed' };
}

/**
 * ฟังก์ชันสำหรับ debug session
 * สามารถ log sessionData ได้ แต่ควรแน่ใจว่าไม่มีข้อมูลอ่อนไหว
 */
function debugUserSession(sessionData) {
  // ตรวจสอบก่อน log ว่าไม่มีข้อมูลอ่อนไหวใน sessionData
  console.log('Debug session:', JSON.stringify(sessionData, null, 2));
  logger.debug(`Session details: ${JSON.stringify(sessionData)}`);
}

module.exports = { authenticateUser, processPayment, debugUserSession };
