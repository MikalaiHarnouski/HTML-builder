const path = require('path');
const fs = require('fs');
const process = require('process');

fs.readdir(path.join(__dirname, 'secret-folder'), {withFileTypes : true}, (err, files) => {
  if (err) {
    throw err;
  } else {
    files.forEach(file => {
     if(file.isFile()) {
      let dat = [];	  
      fs.stat(path.resolve(__dirname, 'secret-folder', file.name), (err, stats) => {
        if (err) {
          throw err;
        } else {		  
		  dat.push(file.name.split('.').slice(0, -1).join('.'));
		  dat.push(path.extname(file.name).slice(1));
		  dat.push((Math.round(stats.size/1024)) + 'Kb');
	      process.stdout.write(dat.join(' - ') + '\n');
        }
      })
     }
    })
  }
});