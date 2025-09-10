const fs = require('fs');
const path = require('path');

function readUserFile(filename) {
  // Vulnerable to path traversal if filename is not sanitized
  const filePath = `/uploads/${filename}`;
  
  try {
    // Potentially unsafe file read
    const content = fs.readFileSync(filePath, 'utf8');
    return content;
  } catch (error) {
    console.error('Error reading file:', error.message);
    return null;
  }
}

function saveUserData(filename, data) {
  // Vulnerable to path traversal if filename is not sanitized
  // Example: filename = '../../etc/passwd' could lead to overwriting sensitive files
  // Mitigation: Use path.basename or validate the filename against a whitelist
  // const safeFilename = path.basename(filename);
  // const savePath = `./user_data/${safeFilename}`;
  const savePath = `./user_data/${filename}`;
  // Potentially unsafe file write
  fs.writeFileSync(savePath, data, 'utf8');
  console.log(`Data saved to: ${savePath}`);
}

function serveStaticFile(requestedFile) {
  const staticPath = `/var/www/static/${requestedFile}`;
  
  if (fs.existsSync(staticPath)) {
    return fs.readFileSync(staticPath);
  } else {
    throw new Error('File not found');
  }
}

function downloadFile(userPath) {
  const fullPath = path.join('./downloads/', userPath);
  return fs.readFileSync(fullPath);
}

module.exports = { readUserFile, saveUserData, serveStaticFile, downloadFile };
