'use strict';
const Generator = require('yeoman-generator'); // Provide generator class
const chalk = require('chalk'); // Provide console customization
const yosay = require('yosay'); // Provide Yeoman console for quote

const output = {
  // normalize CLI output
  question: str => chalk.underline.blueBright(str),
};

const typesConfig = (cmpName, path = '') => ({
  class: {
    src: '_component.js',
    out: `./src/${path}/${cmpName}.jsx`,
  },
  functional: {
    src: '_component.fn.js',
    out: `./src/${path}/${cmpName}.jsx`,
  },
  hoc: {
    src: '_component.hoc.js',
    out: `./src/${path}/${cmpName}.jsx`,
  },
});

const storyConfig = (cmpName, path = '') => ({
  src: '_stories/_component.stories.js',
  out: `./src/${path}/__stories__/${cmpName}.stories.js`,
});

const prompts = [
  // Gather information for module
  {
    type: 'list',
    name: 'type',
    message: output.question('Which type of component would you like? '),
    default: 'class',
    choices: Object.keys(typesConfig()),
  },
  {
    type: 'confirm',
    name: 'story',
    message: output.question('Would you like include a story? '),
    default: true,
  },
  {
    type: 'input',
    name: 'path',
    message: output.question('location path? (prepends "./src/") '),
    default: 'components',
  },
];

const filesArray = (cmpName, path = '') => [
  {
    src: '_tests/_component.testJest.js',
    out: `./src/${path}/__tests__/${cmpName}.testJest.jsx`,
  },
];

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);

    this.argument('cmpName', {
      type: String,
      required: true,
      description: 'Component Name',
    }); // CLI argument -> available in this.options['cmpName']
  }

  async prompting() {
    this.log(yosay(`Let's create a new component!`)); // Let Yeoman avatar speak
    this.answers = await this.prompt(prompts);
  }

  writing() {
    // CI Settings
    const cmpName =
      this.options.cmpName.charAt(0).toUpperCase() +
      this.options.cmpName.slice(1); // get component name
    const { type: typeAnswer, story: includeStory, path } = this.answers; // get answers
    const files = filesArray(cmpName, path);

    files.push(typesConfig(cmpName, path)[typeAnswer]);

    if (includeStory) {
      files.push(storyConfig(cmpName, path));
    }

    files.forEach(file => {
      return this.fs.copyTpl(
        this.templatePath(file.src),
        this.destinationPath(file.out),
        {
          cmpName,
        },
      );
    });
  }

  // Install Dependencies
  // install() {
  //   this.installDependencies();
  // }
};
