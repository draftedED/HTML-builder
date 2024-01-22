const fs = require('node:fs');
const path = require('node:path');
const dirPath = path.join('./03-files-in-folder/', 'secret-folder');

fs.readdir(dirPath, { withFileTypes: true }, (error, files) => {
  if (error) {
    console.log(error.message);
  } else {
    files.forEach((file) => {
      if (file.isFile()) {
        const extension = path.extname(`${dirPath}${file.name}`);
        const name = path.basename(`${dirPath}/${file.name}`, extension);
        fs.stat(`${dirPath}/${file.name}`, (error, stats) => {
          if (error) {
            console.log(error.message);
          } else {
            console.log(`${name} - ${extension.replace('.', '')} - ${(stats.size / 1024).toFixed(3)}kb`); 
            }
          });
      }
    })
  }
});