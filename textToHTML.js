#!/usr/bin/env node
const argv = require('yargs/yargs')(process.argv.slice(2))
  .usage('Usage: node $0 <command> [options]')
  .help('h')
  .option('i', {
    alias: 'input',
    demandOption: true,
    default: '.',
    describe: 'file argument',
    type: 'string'
  }
  ).option('o', {
    alias: 'output',
    demandOption: true,
    default: './dist',
    describe: 'output folder for html files.',
    type: 'string'
  }
  ).option('s',{
    alias: 'stylesheet',
    demandOption: false,
    describe: 'stylesheet to be applied to html files.',
    type: 'string'
  }
  ).option('l', {
    alias: 'lang',
    demandOption: false,
    describe: 'language for the HTML document.',
    type: 'string'
  }
  ).alias('h', 'help')
  .alias('v', 'version')
  .alias('i', 'input')
  .alias('o', 'output')
  .alias('s', 'stylesheet')
  .command("--input", "Convert lines in a text file to HTML <p> tags.")
  .example("textToHTML: node textToHTML.js -i <filename>.").argv

const fs = require('fs');
const path = require('path');
let tempString;
if(argv.o === "./dist"){
  if(fs.existsSync("./dist")){
      fs.rmdirSync("./dist",{recursive: true} , error=>{
        if(error){
          console.log("Error removing dist directory.");
          process.exitCode = -1;
        }
      });
    } //end of ./dist code
    fs.mkdir("./dist", error=>{
      if(error){
        console.log("Error creating dist directory.");
        process.exitCode = -1;
      }
    });
}
if(fs.existsSync(argv.input)){
  if(fs.lstatSync(argv.input).isDirectory()){ //if the input is a directory
    fs.readdirSync(argv.input).forEach(file =>{
      fs.readFile(path.join(argv.input, file), 'utf-8', function(error, data){
          if (path.extname(file) === ".txt" ){
            const html = data
            .split(/\r?\n\r?\n/)
            .map(para =>
              `\n<p>${para.replace(/\r?\n/, ' ')}</p>`
              ).join(' ');
              tempString = `<!DOCTYPE html>` + '\n'
              + `<html lang="${argv.l ? argv.l : "en-CA"}">\n<head> \n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width, initial-scale=1">` + `\n</head>\n<body>` + `${html}` + `\n</body>\n</html>`;
              if(argv.s){
                tempString = `<!DOCTYPE html>` + '\n'
                + `<html lang="${argv.l ? argv.l : "en-CA"}">\n<head> \n<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">` + `\n<link rel="stylesheet" href="${argv.s}"> \n</head>\n<body>` + `${html}` + `\n</body>\n</html>`;
              }
              fs.writeFile(`${argv.output}/${path.basename(file, ".txt")}.html`, tempString, error=>{
                if(error){
                  console.log("Error writing to directory.");
                  process.exitCode = -1;
                }
              });
          }

          if (path.extname(file) === ".md" ){
            const html = data
            .split(/[\r?\n\r?\n]/g)
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
              tempString = `<!DOCTYPE html>` + '\n'
              + `<html lang="${argv.l ? argv.l : "en-CA"}">\n<head> \n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width, initial-scale=1">` + `\n</head>\n<body>` + `${html}` + `\n</body>\n</html>`;
              if(argv.s){
                tempString = `<!DOCTYPE html>` + '\n'
                + `<html lang="${argv.l ? argv.l : "en-CA"}">\n<head> \n<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">` + `\n<link rel="stylesheet" href="${argv.s}"> \n</head>\n<body>` + `${html}` + `\n</body>\n</html>`;
              }
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

        if (path.extname(argv.input) === ".md"){
          //console.log("Data value:", data);        
        const html = data
          .split(/[\r?\n\r?\n]/g)
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
          tempString = `<!DOCTYPE html>` + '\n'
          + `<html lang="${argv.l ? argv.l : "en-CA"}">\n<head> \n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width, initial-scale=1">` + `\n</head>\n<body>` + `${html}` + `\n</body>\n</html>`;
          if(argv.s){
            tempString = `<!DOCTYPE html>` + '\n'
            + `<html lang="${argv.l ? argv.l : "en-CA"}">\n<head> \n<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">` + `\n<link rel="stylesheet" href="${argv.s}"> \n</head>\n<body>` + `${html}` + `\n</body>\n</html>`;
          }

          fs.writeFile(`${argv.output}/${path.basename(argv.input, ".md")}.html`, tempString, error=>{
            if(error){
              console.log("Error creating HTML file from '.md'.");
              process.exitCode = -1;
            }
          });
        }

        if(path.extname(argv.input) === ".txt"){
          const html = data
        .split(/\r?\n\r?\n/)
        .map(para =>
          `\n<p>${para.replace(/\r?\n/, ' ')}</p> </br>`
          ).join(' ');
          tempString = `<!DOCTYPE html>` + '\n'
          + `<html lang="${argv.l ? argv.l : "en-CA"}">\n<head> \n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width, initial-scale=1">` + `\n</head>\n<body>` + `${html}` + `\n</body>\n</html>`;
          if(argv.s){
            tempString = `<!DOCTYPE html>` + '\n'
            + `<html lang="${argv.l ? argv.l : "en-CA"}">\n<head> \n<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">` + `\n<link rel="stylesheet" href="${argv.s}"> \n</head>\n<body>` + `${html}` + `\n</body>\n</html>`;
          }
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
