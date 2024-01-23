const fs = require('node:fs');
const path = require('node:path');
const sourceFolder = path.join(__dirname, '/files');
const destinationFolder = path.join(__dirname, '/files-copy');

fs.rm(destinationFolder, { recursive: true }, (error) => {
  if (error) {}
  fs.mkdir(path.join(__dirname, 'files-copy'), { recursive: true }, (error) => {
    if (error) {
      return console.log(error.message);
    } else {
      copyDir();
    }
  });
});

function copyDir() {
  fs.readdir(sourceFolder, { withFileTypes: true }, (error, files) => {
    if (error) {
      return console.log(error.message);
    } else {
      files.forEach((file) => {
        fs.copyFile(
          `${sourceFolder}/${file.name}`,
          `${destinationFolder}/${file.name}`,
          (error) => {
            if (error) {
              return console.log(error.message);
            }
          },
        );
      });
    }
  });
}
