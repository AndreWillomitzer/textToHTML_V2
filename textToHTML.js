#!/usr/bin/env node
const fs = require("fs");
const path = require("path");
var argv = require("./yargsConfig");
var md = require("markdown-it")({
  html: true,
  linkify: true,
  typographer: true,
});

const processMarkdown = (data) => {
  return md.render(data);
};
const generatePara = (data) => {
  return data
    .split(/\r?\n\r?\n/)
    .map((para) => `\n<p>${para.replace(/\r?\n/, " ")}</p>`)
    .join(" ");
};
let tempString;

if (fs.existsSync(argv.input)) {
  if (fs.lstatSync(argv.input).isDirectory()) {
    //if the input is a directory
    fs.readdirSync(argv.input).forEach((file) => {
      let fileExt = path.extname(file);
      fs.readFile(path.join(argv.input, file), "utf-8", function (error, data) {
        if (path.extname(file) === ".txt") {
          let fileName = path.basename(file, ".txt");
          const html = generatePara(data);
          let styles = argv.s
            ? `\n<link rel="stylesheet" href="${argv.s}">`
            : "";
          tempString =
            `<!DOCTYPE html>` +
            "\n" +
            `<html lang="${
              argv.l ? argv.l : "en-CA"
            }">\n<head> \n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width, initial-scale=1">` +
            `\n<title>${fileName}</title>` +
            styles +
            `\n</head>\n<body>` +
            `${html}` +
            `\n</body>\n</html>`;
          fs.writeFile(
            `${argv.output}/${path.basename(file, ".txt")}.html`,
            tempString,
            (error) => {
              if (error) {
                console.log("Error writing to directory.");
                process.exitCode = -1;
              }
            }
          );
        }
        if (fileExt === ".md") {
          let fileName = path.basename(file, ".md");
          const html = processMarkdown(data);
          let styles = argv.s
            ? `\n<link rel="stylesheet" href="${argv.s}">`
            : "";
          tempString =
            `<!DOCTYPE html>` +
            "\n" +
            `<html lang="${
              argv.l ? argv.l : "en-CA"
            }">\n<head> \n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width, initial-scale=1">` +
            `\n<title>${fileName}</title>` +
            styles +
            `\n</head>\n<body>` +
            `${html}` +
            `\n</body>\n</html>`;
          fs.writeFile(
            `${argv.output}/${path.basename(file, ".md")}.html`,
            tempString,
            (error) => {
              if (error) {
                console.log("Error writing to directory.");
                process.exitCode = -1;
              }
            }
          );
        }
      });
    });
  } else {
    //if the input is a single file
    fs.readFile(argv.input, "utf8", function (error, data) {
      if (error) {
        console.log("Error reading from input file.");
        process.exitCode = -1;
      }
      let fileExt = path.extname(argv.input);
      if (fileExt === ".md") {
        let fileName = path.basename(argv.input, ".md");
        const html = processMarkdown(data);
        let styles = argv.s ? `\n<link rel="stylesheet" href="${argv.s}">` : "";
        tempString =
          `<!DOCTYPE html>` +
          "\n" +
          `<html lang="${
            argv.l ? argv.l : "en-CA"
          }">\n<head> \n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width, initial-scale=1">` +
          `\n<title>${fileName}</title>` +
          styles +
          `\n</head>\n<body>` +
          `${html}` +
          `\n</body>\n</html>`;
        fs.writeFile(
          `${argv.output}/${path.basename(argv.input, ".md")}.html`,
          tempString,
          (error) => {
            if (error) {
              console.log("Error creating HTML file from '.md'.");
              process.exitCode = -1;
            }
          }
        );
      }
      if (fileExt === ".txt") {
        let fileName = path.basename(argv.input, ".txt");
        const html = generatePara(data);
        let styles = argv.s ? `\n<link rel="stylesheet" href="${argv.s}">` : "";
        tempString =
          `<!DOCTYPE html>` +
          "\n" +
          `<html lang="${
            argv.l ? argv.l : "en-CA"
          }">\n<head> \n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width, initial-scale=1">` +
          `\n<title>${fileName}</title>` +
          styles +
          `\n</head>\n<body>` +
          `${html}` +
          `\n</body>\n</html>`;

        fs.writeFile(
          `${argv.output}/${path.basename(argv.input, ".txt")}.html`,
          tempString,
          (error) => {
            if (error) {
              console.log("Error creating HTML file from '.txt'.");
              process.exitCode = -1;
            }
          }
        );
      }
    });
  }
} else {
  console.log("File or folder does not exist.");
  process.exitCode = -1;
}
process.on("exit", (code) => {
  console.log(`Exiting with code: ${code}`);
});
