const { htmlTemplate } = require("./htmlTemplate");

describe("htmlTemplate check", () => {
  it("Should generate the correct html template", () => {
    // const testString = "";
    const returnResult = htmlTemplate(
      "https://cdn.jsdelivr.net/npm/water.css@2/out/water.css",
      "test",
      "en",
      "<p>Hello world</p>"
    );
    const expectedResult = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>test</title>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/water.css@2/out/water.css">
</head>
<body><p>Hello world</p>
</body>
</html>`;
    expect(returnResult).toBe(expectedResult);
  });
});
