# textToHTML_V2 Contribution Guidelines

### Requirements

- Current version of NodeJS.
- npm package manager.

### Installation

- Clone the repository and fork your clone.
- Navigate to the folder you cloned.
- cd into the project folder.
- `npm install` to download dependencies.

### Development

- Create a branch for your work.
- Make your changes and save.
- Check which files were modified using git status.
- Stage these changed files in git (eg. git add file1 file2)
- Commit your changes, git commit -m "description of changes here..."
- Push your commits and branch to your fork, git push origin {your branch name}
- Create a pull request on GitHub detailing your changes and how you tested your solution.

### Development Checks

#### Eslint

- `npm run lint` will run all JavaScript files against the project style guides found in **.eslintrc**. Excludes md, html, css, json files.
- `npm run eslint-fix` will do the same as `lint` and also "fix" any errors.
- `npm run eslint` is the same as the first command, but more typing.

#### Prettier

- `npm run prettier-check` runs a check against the prettier style guide found in **prettierrc.json** for all JavaScript files. Excludes md, html, css, json files.
- `npm run prettier` runs the same check and adds --write option to attempt to fix the style issues.

#### Testing Your Changes

- This tool uses a framework called Jest for testing.
- To write additional tests, look for files ending in `.test.js` or `.spec.js` and find the `describe()` suite that matches the task you want to test.
- When creating a new test or test suite, please add to the `describe()` or `it()` method what the purpose of the test is. For example `it("should return a string")`.
- To run all the test suites, type `npm test` in the command line.
- To exclude a test, you may go into the test file and change `it()` to `xit()` to exclude a single test. 
- To exclude all tests/suites except one, add the `only()` method to `describe()` or `it()` to run that test suite or individual test.
