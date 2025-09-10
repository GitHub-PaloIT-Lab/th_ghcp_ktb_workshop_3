const { execFile } = require('child_process');
const path = require('path');

function processUserFile(filename) {
  // ตรวจสอบชื่อไฟล์ให้ไม่มีอักขระอันตราย
  if (!/^[\w\-]+$/.test(filename)) {
    console.error('Invalid filename');
    return;
  }
  const logPath = path.join('/var/log', `${filename}.log`);
  execFile('grep', ['error', logPath], (error, stdout, stderr) => {
    if (error) {
      console.error(`Command failed: ${error}`);
      return;
    }
    console.log(`Log analysis results: ${stdout}`);
  });
}

function convertImageFile(inputFile, outputFormat) {
  // ตรวจสอบนามสกุลไฟล์และฟอร์แมต
  if (!/^[\w\-.]+$/.test(inputFile) || !/^[a-zA-Z0-9]+$/.test(outputFormat)) {
    console.error('Invalid input');
    return;
  }
  const outputFile = `output.${outputFormat}`;
  execFile('convert', [inputFile, outputFile], (error, stdout, stderr) => {
    if (error) {
      console.error(`Conversion failed: ${error}`);
      return;
    }
    console.log('Image converted successfully');
  });
}

function pingHost(hostname) {
  // ตรวจสอบ hostname
  if (!/^[a-zA-Z0-9.\-]+$/.test(hostname)) {
    console.error('Invalid hostname');
    return;
  }
  execFile('ping', ['-c', '3', hostname], (error, stdout) => {
    if (error) {
      console.error(`Ping failed: ${error}`);
      return;
    }
    console.log(`Ping result: ${stdout}`);
  });
}

module.exports = { processUserFile, convertImageFile, pingHost };