const fs = require('node:fs');
const path = require('node:path');
const readline = require('readline');

const writeStream = fs.createWriteStream(
  path.join(__dirname, 'text.txt'),
  'utf-8',
);
const r1 = readline.createInterface(process.stdin, process.stdout);

r1.setPrompt('Your input:');
process.stdout.write(`Greetings!\n`);
r1.prompt();

process.on('exit', () => {
  console.log('Bye!');
});

r1.on('SIGINT', () => {
  process.exit();
});

r1.on('line', (userInput) => {
  if (userInput.toLowerCase() === 'exit') {
    process.exit();
  } else {
    r1.prompt();
    writeStream.write(`${userInput} `);
  }
});
