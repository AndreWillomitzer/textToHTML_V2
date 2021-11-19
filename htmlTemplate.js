const htmlTemplate = (stylesheet, fileName, language, content) => {
  return (
    `<!DOCTYPE html>` +
    "\n" +
    `<html lang="${
      language ? language : "en-CA"
    }">\n<head>\n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width, initial-scale=1">` +
    `\n<title>${fileName}</title>` +
    (stylesheet ? `\n<link rel="stylesheet" href="${stylesheet}">` : "") +
    `\n</head>\n<body>` +
    `${content}` +
    `\n</body>\n</html>`
  );
};

module.exports = { htmlTemplate };
