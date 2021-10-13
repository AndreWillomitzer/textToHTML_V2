#!/usr/bin/env node
var argv = require('./yargsConfig');
const fs = require('fs');
const path = require('path');

const headingMarkdown = (content) => { //heading1Markdown() takes the content which is unformatted md file text. 
  return content.split(/[\r?\n\r?\n]/g)
  .map((line) =>
    line
    .replace (/^## (.*$)/gim, '<h2>$1</h2>')
    .replace(/^# (.*$)/gim, '<h1>$1</h1>')
    .replace(/(^[a-z](.*)$)/gim, '<p>$1</p>')
    /*
    replace any line starting with # and a space with <h1> surrounding itself.
    replace any line starting with an alphabetical character followed by 0 or more of anything with <p> surrounding itself.
    */
  ).join('\n'); //this makes the content a string rather than array.
};
  
const processMarkdown = (data) => {
    let processedContent = "";
    processedContent = headingMarkdown(data);
    return processedContent;
};
const generatePara = (data) =>{
  return data
  .split(/\r?\n\r?\n/)
  .map(para =>
    `\n<p>${para.replace(/\r?\n/, ' ')}</p>`
    ).join(' ');
}
let tempString;

if(fs.existsSync(argv.input)){
  if(fs.lstatSync(argv.input).isDirectory()){ //if the input is a directory
    fs.readdirSync(argv.input).forEach(file =>{
      let fileExt = path.extname(file);
      fs.readFile(path.join(argv.input, file), 'utf-8', function(error, data){
          if (path.extname(file) === ".txt" ){
            const html = generatePara(data);
            let styles = argv.s ? `\n<link rel="stylesheet" href="${argv.s}">` : "";
            tempString = `<!DOCTYPE html>` + '\n'
            + `<html lang="${argv.l ? argv.l : "en-CA"}">\n<head> \n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width, initial-scale=1">`+ styles + `\n</head>\n<body>` + `${html}` + `\n</body>\n</html>`;
              fs.writeFile(`${argv.output}/${path.basename(file, ".txt")}.html`, tempString, error=>{
                if(error){
                  console.log("Error writing to directory.");
                  process.exitCode = -1;
                }
              });
          }
          if (fileExt === ".md" ){
            const html = processMarkdown(data);
            let styles = argv.s ? `\n<link rel="stylesheet" href="${argv.s}">` : "";
            tempString = `<!DOCTYPE html>` + '\n'
            + `<html lang="${argv.l ? argv.l : "en-CA"}">\n<head> \n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width, initial-scale=1">`+ styles + `\n</head>\n<body>` + `${html}` + `\n</body>\n</html>`;
              fs.writeFile(`${argv.output}/${path.basename(file, ".md")}.html`, tempString, error=>{
                if(error){
                  console.log("Error writing to directory.");
                  process.exitCode = -1;
                }
              });
          }
        })
      })
    }else{ //if the input is a single file
      fs.readFile(argv.input, 'utf8', function(error, data){
        if(error){
          console.log("Error reading from input file.");
          process.exitCode = -1;
        }
      let fileExt = path.extname(argv.input);
      if (fileExt === ".md"){
        const html = processMarkdown(data);
        let styles = argv.s ? `\n<link rel="stylesheet" href="${argv.s}">` : "";
        tempString = `<!DOCTYPE html>` + '\n'
        + `<html lang="${argv.l ? argv.l : "en-CA"}">\n<head> \n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width, initial-scale=1">`+ styles + `\n</head>\n<body>` + `${html}` + `\n</body>\n</html>`;
        fs.writeFile(`${argv.output}/${path.basename(argv.input, ".md")}.html`, tempString, error=>{
          if(error){
            console.log("Error creating HTML file from '.md'.");
            process.exitCode = -1;
          }
        });
      }
      if(fileExt === ".txt"){
          const html = generatePara(data);
          let styles = argv.s ? `\n<link rel="stylesheet" href="${argv.s}">` : "";
          tempString = `<!DOCTYPE html>` + '\n'
          + `<html lang="${argv.l ? argv.l : "en-CA"}">\n<head> \n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width, initial-scale=1">`+ styles + `\n</head>\n<body>` + `${html}` + `\n</body>\n</html>`;

          fs.writeFile(`${argv.output}/${path.basename(argv.input, ".txt")}.html`, tempString, error=>{
            if(error){
              console.log("Error creating HTML file from '.txt'.");
              process.exitCode = -1;
            }
          });
        }           
      });
    }      
}else{
  console.log("File or folder does not exist.");
  process.exitCode = -1;
}
process.on('exit', (code) => {
  console.log(`Exiting with code: ${code}`);
});
