const path = require('node:path');
const fs = require('node:fs');
const filePath = path.join(__dirname, 'text.txt');
const readStream = fs.createReadStream(filePath, 'utf-8');

readStream.on('data', (text) => {
  try {
    console.log(text);
  } catch (error) {
    console.log(error);
  }
});

readStream.on('end', () => {
  readStream.close();
});