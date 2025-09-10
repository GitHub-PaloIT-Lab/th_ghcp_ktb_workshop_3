const { exec } = require('child_process');

function processUserFile(filename) {
  const command = `grep "error" /var/log/${filename}.log`;
  //
  
  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`Command failed: ${error}`);
      return;
    }
    console.log(`Log analysis results: ${stdout}`);
  });
}

function convertImageFile(inputFile, outputFormat) {

  const convertCommand = `convert ${inputFile} output.${outputFormat}`;
  
  exec(convertCommand, (error, stdout, stderr) => {
    if (error) {
      console.error(`Conversion failed: ${error}`);
      return;
    }
    console.log('Image converted successfully');
  });
}

function pingHost(hostname) {
  exec(`ping -c 3 ${hostname}`, (error, stdout) => {
    console.log(`Ping result: ${stdout}`);
  });
}


module.exports = { processUserFile, convertImageFile, pingHost };
