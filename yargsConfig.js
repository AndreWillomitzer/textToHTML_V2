const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");
const fs = require('fs');
const path = require('path');

const argv = yargs(hideBin(process.argv))
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
  ).option('c', {
    alias: 'config',
    demandOption: false,
    describe: 'Accept a file path to a JSON config file.',
  }
  ).alias('h', 'help')
  .alias('v', 'version')
  .alias('i', 'input')
  .alias('o', 'output')
  .alias('s', 'stylesheet')
  .command("--input", "Convert lines in a text file to HTML <p> tags.")
  .example("textToHTML: node textToHTML.js -i <filename>.").argv
  if(argv.o === "./dist"){
    if(fs.existsSync("./dist")){
        fs.rmSync("./dist",{recursive: true} , error=>{
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
  //add config
  if(argv.c){
    try{
      const configJson = fs.readFileSync(path.normalize(argv.c));
      const con = JSON.parse(configJson);
      argv.input = con.input;
      argv.stylesheet = con.stylesheet;
      argv.lang = con.lang;
      argv.output = con.output || "./dist";
    }catch(err){
      console.log("Error: Could not read config.json file");
      process.exitCode = -1;
    }
  }
  module.exports = argv;
