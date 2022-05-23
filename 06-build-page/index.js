const fs = require("fs");
const path = require('path');



let createHtmlFiles = () => {
	
	const fileFolderDir = path.join( __dirname, 'components' );
	const source = path.join( __dirname, 'template.html' );
	const dest = path.join( __dirname, 'project-dist', 'index.html');
	let sample = '';
	let stream = fs.createReadStream( source );

	stream.on('data', (data) => {
		sample += data.toString();
		
		fs.readdir(fileFolderDir, {withFileTypes: true} , ( err, data) => {
			if (err) {
				return console.log(err);
			}
			data.forEach(file => {
				if (file.isFile() ) {  
					fs.stat( fileFolderDir + file.name , (err, stats) => {
						let formatFile = path.extname(fileFolderDir + file.name).split('.').pop();
						let nameFile = path.parse(file.name).name;
						let fileContentStream = fs.createReadStream(  path.join( __dirname, 'components',  file.name),'utf-8' ); 
						fileContentStream.on('data', (data) => {
							if (formatFile == 'html') { 
								if ( sample.indexOf( nameFile ) > -1 ) {
									sample = sample.replace( '{{' + nameFile + '}}', data);
									fs.writeFile( dest, sample, () => {});
								}
							}
						}); 
					}) 
				}
			})
		})
	});
}

let copyCssFiles = () => {
	
	const folder = path.join(__dirname, 'styles');
	const folderBundle = path.join(__dirname, 'project-dist/style.css');

	fs.readdir(folder, 'utf-8', (err, files) => {
		if (err)
		{throw err;}
		fs.writeFile(folderBundle, '', (err) => {
		if (err) {
		  throw err;
		}
	  });
	  files.forEach(item => {
		if (path.extname(item) === '.css') {
		  fs.createReadStream(path.join(folder, item)).on('data', (data) => {
			fs.appendFile(folderBundle, data, (err) => {
			  if (err) {
				throw err;
			  }});
		  });
		}});
	});
}


let copyAssetsFiles = ( dirname, source, dest ) => {
    const fs = require("fs");
    const path = require('path');

    fs.mkdir(path.join( dirname, dest), { recursive: true }, (err) => {
        if (err) {
            throw err;
        }
    });

    fs.readdir(path.join( dirname, source), {withFileTypes: true} , ( err, data) => {
        if (err) {
            throw err;
        }
        data.forEach(item => {
            if (item.isFile() ) {  
          
                fs.copyFile( path.join( dirname, source, item.name) , path.join( dirname, dest, item.name), (err) => {
                    if (err) {
                        throw err;
                    }
                } );
            }
            else {
               
                copyAssetsFiles( dirname, source + '//' + item.name, dest + '//' + item.name  );
            }
        })
    } )
}

createHtmlFiles();
copyCssFiles();
copyAssetsFiles( __dirname, 'assets', 'project-dist//assets' );