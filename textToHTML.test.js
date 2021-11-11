const { processMarkdown } = require("./textToHTML");

test("it should return h2", () => {
  const testString = "## Should be inside h2.";
  const returnResult = processMarkdown(testString);
  const expectedResult = "<h2>Should be inside h2.</h2>";
  expect(returnResult).toContain(expectedResult); //change to stringMatching
});
