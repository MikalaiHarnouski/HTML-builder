const path = require('path');
const fs = require('fs/promises');
const dirName = 'files';
const source = path.join(__dirname, dirName);
const dest = path.join(__dirname, dirName + '-copy');


fs.rm(dest, {
    recursive: true,
    force: true
}).finally(() => {
    fs.mkdir(dest, {
        recursive: true
    });
    fs.readdir(source, {
        withFileTypes: true
    }).then((data) => {
        data.forEach( (item) => {
            if (item.isFile()) {
                fs.copyFile(path.join(source, item.name), path.join(dest, item.name));}
        });
    });
});
