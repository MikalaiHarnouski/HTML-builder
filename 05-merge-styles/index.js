const path = require('path');
const fs = require('fs');
const folder = path.join(__dirname, 'styles');
const folderBundle = path.join(__dirname, 'project-dist/bundle.css');

fs.readdir(folder, 'utf-8', (err, files) => {
    if (err)
    {throw err;}
    fs.writeFile(folderBundle, '', (err) => {
    if (err) {
      throw err;
    }
  });
  files.forEach(file => {
    if (path.extname(file) === '.css') {
      fs.createReadStream(path.join(folder, file)).on('data', (data) => {
        fs.appendFile(folderBundle, data, (err) => {
          if (err) {
            throw err;
          }});
      });
    }});
});