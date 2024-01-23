const fs = require('node:fs');
const path = require('node:path');
const sourceFolder = path.join(__dirname, '/assets');
const destinationFolder = path.join(__dirname, '/project-dist');
const sourceStyle = path.join(__dirname, 'styles');
const style = path.join(destinationFolder, 'style.css');
const writeStreamStyle = fs.createWriteStream(style, 'utf-8');
const componentsPath = path.join(__dirname, '/components');
const htmlPath = path.join(destinationFolder, 'index.html');
const htmlTemplate = path.join(__dirname, '/template.html');

fs.mkdir(destinationFolder, { recursive: true }, (error) => {
  if (error) {
    return console.log(error.message);
  } else {
    copyDir();
  }
});

function copyDir() {
  fs.mkdir(`${destinationFolder}/assets`, { recursive: true }, (error) => {
    if (error) {
      return console.log(error);
    } else {
      fs.readdir(sourceFolder, { withFileTypes: true }, (error, files) => {
        if (error) {
          return console.log(error.message);
        } else {
          files.forEach((file) => {
            let sourceObject = path.join(sourceFolder, file.name);
            let targetObject = path.join(
              `${destinationFolder}/assets`,
              file.name,
            );
            if (file.isFile()) {
              fs.copyFile(sourceObject, targetObject, (error) => {
                if (error) {
                  return console.log(error);
                }
              });
            } else if (file.isDirectory()) {
              fs.mkdir(targetObject, { recursive: true }, (error) => {
                if (error) {
                  return console.log(error.message);
                }
              });
              fs.readdir(
                sourceObject,
                { withFileTypes: true },
                (error, files) => {
                  if (error) {
                    return console.log(error.message);
                  } else {
                    files.forEach((file) => {
                      fs.copyFile(
                        `${sourceObject}/${file.name}`,
                        `${targetObject}/${file.name}`,
                        (error) => {
                          if (error) {
                            return console.log(error.message);
                          }
                        },
                      );
                    });
                  }
                },
              );
            }
          });
        }
      });
    }
  });
  mergeStyles();
}

function mergeStyles() {
  fs.readdir(sourceStyle, { withFileTypes: true }, (error, files) => {
    if (error) {
      console.log(error.message);
    } else {
      files.forEach((file) => {
        fs.createReadStream(path.join(sourceStyle, `${file.name}`)).pipe(
          writeStreamStyle,
        );
      });
    }
  });
  createHTML();
}

function createHTML() {
  let tempTemplate = '';

  fs.readFile(htmlTemplate, { withFileTypes: true }, (error, data) => {
    if (error) {
      console.log(error.message);
    }
    tempTemplate += data;

    fs.readdir(componentsPath, { withFileTypes: true }, (error, components) => {
      if (error) {
        console.log(error.message);
      }
      components.forEach((component) => {
        const fileExtension = path.extname(
          `${componentsPath}/${component.name}`,
        );
        if (fileExtension === '.html') {
          fs.readFile(
            `${componentsPath}/${component.name}`,
            'utf-8',
            (error, data) => {
              if (error) {
                console.log(error.message);
              }
              tempTemplate = tempTemplate.replaceAll(
                `{{${path.basename(
                  `${componentsPath}/${component.name}`,
                  fileExtension,
                )}}}`,
                data,
              );

              fs.writeFile(htmlPath, tempTemplate, (error) => {
                if (error) {
                  console.log(error.message);
                }
              });
            },
          );
        }
      });
    });
  });
}
