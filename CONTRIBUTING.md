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
