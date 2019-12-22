# React App Starter

Base configuration for a React/Redux application

---

## Contents

1. [Build Commands](#build-commands)
2. [Tests](#tests)
3. [Linting](#linting)
4. [Generators](#generators)
5. [Storybook](#storybook)
6. [Notes](#notes)

---

### Build Commands:

<a name="build-commands" ></a>
To run a local development server on port `8000` with mock data and hot reloading enabled (_changes made to code automatically refresh that single component in the browser_):

```bash
$ npm run local
```

To run the local environment but fetch data from the development server and run storybook alongside the app:

```bash
$ npm run dev
```

To build the development environment and compile code into **./build**:

```bash
$ npm run build
```

To minimize and compile the appliction into the **./build** folder for production:

```bash
$ npm run prod
```

---

### Tests

<a name="tests"></a>
To run all tests, and output results to html files that open in browser automatically (runs `npm run test:mocha` and `npm run test:jest`):

```bash
$ npm run test
```

To run just Mocha test (_test modules functionality_), test will run in terminal and output to an html file (_`/testReports/mochawesome-report/mochawesome.html`_) that will open in browser:

```bash
$ npm run test:mocha
```

To run just Jest test (_test components for rendering & changes_), test will run in terminal and output to an html file (_`/testReports/jestStare-report/index.html`_) that will open in browser:

```bash
$ npm run test:jest
```

To open the most recent Mocha tests in browser:

```bash
$ npm run mochaReport
```

To open the most recent Jest test in browser:

```bash
$ npm run jestReport
```

---

### Linting

<a name="linting"></a>
To lint src folder (_using eslint_):

```bash
npm run eslint
```

To lint src and automatically fix errors **without notification**:

```bash
npm run eslint:fix
```

---

### Generators

<a name="generators"></a>
**Install and Generators:**

Generators will automatically create modules and components (_depending on generator used_) for you, that you may then be able to edit accordingly. To use Generators, make sure yeoman is installed globally:

```bash
$ npm install -g yo
```

For each generator, navigate to their respective directories (_usually `...'app'/scripts/generators/`_), and in their root direcory run:

```bash
$ npm install
```

and then run:

```bash
$ sudo npm link
```

Now the generator is ready to be used.

**Use Generators**

To create a Module, run this script with a camelCased module name supplied.
_**Note**: Yeoman will look for the `.yo-rc.json` file to identify the `src` directory._

```bash
$ yo cbra-module <modname>
```

This will begin the generator for creating a standard module, and ask a few questions before generating the module in the modules folder along with tests for the module.

To create a Component, run this script with a camelCased component name supplied:

```bash
$ yo cbra-component <cmpName>
```

or (_moust be ran from the project directory_):

This will begin the generator for creating a standard component, along with tests.

---

### Storybook

<a name="storybook"></a>
To run just Storybook (_component viewer_) on port `5040`:

```bash
$ npm run storybook
```

---

### Notes

<a name="notes"></a>

- Some of the application's api calls and functions change slightly based on the enviornment the application is running in. The `env` gets set automagically based on build script key (_i.e. 'dev' or 'prod'_) that is used. If the enviorment is set manually then, for example, a develoment build may try to make live api calls.

- When possible, try to update application information such as html title, analytics Id, etc... using the `buildConfig.js` file.
