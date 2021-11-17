const { processMarkdown, generatePara } = require("./textToHTML");
describe("it should process various Markdown combinations", () => {
  it("should handle a blank file", () => {
    //testing if the input I give is blank (empty file but it exists)
    const emptyContent = "";
    const returnResult = processMarkdown(emptyContent);
    expect(returnResult).toMatch(""); //it should be blank if md.render() worked
  });

  it("should return a string", () => {
    const testString = "";
    const returnResult = processMarkdown(testString);
    expect(typeof returnResult).toBe("string");
  });

  it("it should return h1", () => {
    const testString = "# Should be inside h1.";
    const returnResult = processMarkdown(testString);
    const expectedResult = "<h1>Should be inside h1.</h1>";
    expect(returnResult).toContain(expectedResult); //change to stringMatching
  });

  it("it should return h2", () => {
    const testString = "## Should be inside h2.";
    const returnResult = processMarkdown(testString);
    const expectedResult = "<h2>Should be inside h2.</h2>";
    expect(returnResult).toContain(expectedResult); //change to stringMatching
  });

  it("it should return h3", () => {
    const testString = "### Should be inside h3.";
    const returnResult = processMarkdown(testString);
    const expectedResult = "<h3Should be inside h3.</h3>";
    expect(returnResult).toContain(expectedResult); //change to stringMatching
  });

  it("should return a bolded <h1>", () => {
    const testString = "# **Should be a bolded h1.**";
    const returnResult = processMarkdown(testString);
    const expectedResult = "<h1><strong>Should be a bolded h1.</strong></h1>";
    expect(returnResult).toContain(expectedResult);
  });

  it("should combine tags properly", () => {
    const testMarkdown = `\n# this is a header 1\n\n# this is a header line.\nalso regular.\n\n## this is a header again.`;

    const returnResult = processMarkdown(testMarkdown);

    const expectedResult = `<h1>this is a header 1</h1>\n<h1>this is a header line.</h1>\n<p>also regular.</p>\n<h2>this is a header again.</h2>`;

    expect(returnResult).toContain(expectedResult);
  });

  it("should handle single line codes", () => {
    const testMarkdown = "`()=>{console.log()}`";
    const returnResult = processMarkdown(testMarkdown);
    const expectedResult = "<p><code>()=&gt;{console.log()}</code></p>";
    expect(returnResult).toContain(expectedResult);
  });
  it("should handle code blocks.", () => {
    const testMarkdown = "```\nlet number = 2\n```";
    const returnResult = processMarkdown(testMarkdown);
    const expectedResult = "<pre><code>let number = 2\n</code></pre>";
    console.log(returnResult);
    expect(returnResult).toContain(expectedResult);
  });
});

describe("processPara should only produce paragraph tags", () => {
  it("should ignore headings", () => {
    const testString = "###### Hello";
    const returnResult = generatePara(testString);
    expect(returnResult).toContain("\n<p>###### Hello</p>");
  });

  it("should handle blank input", () => {
    const blankString = "";
    const returnResult = generatePara(blankString);

    expect(returnResult).toContain("<p></p>");
  });

  it("should return a string", () => {
    const testString = "";
    const returnResult = generatePara(testString);
    expect(typeof returnResult).toBe("string");
  });
});
