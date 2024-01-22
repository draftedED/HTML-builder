const fs = require('node:fs');
const path = require('node:path');
const folderToCopy = path.join(__dirname, '/files');

fs.mkdir(path.join(__dirname, 'files-copy'), { recursive: true }, (error) => {
  if (error) {
    return console.log(error);
  }
  console.log('yes!');
});

console.log(__dirname);
