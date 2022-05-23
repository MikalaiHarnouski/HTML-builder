const path = require('path');
const fs = require('fs');
const writeStream = fs.createWriteStream(path.join(__dirname, 'text.txt'));
const process = require('process');

process.stdout.write('Enter text:\n');

process.stdin.on('data', (data) => {
  if (data.toString().trim() === 'exit') {
    sayBuy();
  }
  writeStream.write(data);
});
process.on('SIGINT', sayBuy);

function sayBuy() {
  process.stdout.write('Buy!');
  process.exit();
}