const fs = require('node:fs');
const path = require('node:path');

const target = path.join(__dirname, 'project-dist');
const source = path.join(__dirname, 'styles');
const bundle = path.join(target, 'bundle.css');
const writeStream = fs.createWriteStream(bundle, 'utf-8');

fs.readdir(source, { withFileTypes: true }, (error, files) => {
  if (error) {
    console.log(error.message);
  } else {
    files.forEach((file) => {
      if (file.isFile && path.extname(`${source}${file.name}`) === '.css') {
        fs.createReadStream(path.join(source, `${file.name}`)).pipe(writeStream);
      }
    });
  }
});
