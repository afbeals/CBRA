"use strict";
/* eslint-disable */
const Generator = require('yeoman-generator'); // Provide generator class
const chalk = require('chalk'); // Provide console customization
const yosay = require('yosay'); // Provide Yeoman console for quote

const output = { // normalize CLI output
  question: str => chalk.underline.blueBright(str)
};

const includesArray = ['sagas', 'selectors', 'utility'];

const prompts = [ // Gather information for module
  {
    type: 'checkbox',
    name: 'includes',
    message: output.question('Select item(s) to include in module:'),
    default: includesArray,
    choices: includesArray.map( item => ({
      name: `${item}`,
      value: `${item}`
    }))
  }, {
    when: response => { return (response.includes.includes('selectors') && response.includes.includes('utility'))},
    type: 'confirm',
    name: 'fetchSelectors',
    message: 'include fetchSelectors also?',
    default: true,
  }
];

const filesArray = modName => [
  { src: 'module/_actions.js', out: `src/modules/${modName}/actions.js`},
  { src: 'module/_tests/_actions.testPartial.js', out: `src/modules/${modName}/__tests__/actions.testPartial.js`},
  { src: 'module/_actionTypes.js', out: `src/modules/${modName}/actionTypes.js`},
  { src: 'module/_index.js', out: `src/modules/${modName}/index.js`},
  { src: 'module/_persist.js', out: `src/modules/${modName}/persist.js`},
  { src: 'module/_reducer.js', out: `src/modules/${modName}/reducer.js`},
  { src: 'module/_tests/_reducer.testPartial.js', out: `src/modules/${modName}/__tests__/reducer.testPartial.js`},
  { src: 'module/_tests/_modName.test.js', out: `src/modules/${modName}/__tests__/${modName}.test.js`},
  { src: 'module/_withModName.js', out: `src/modules/${modName}/with${modName.charAt(0).toUpperCase() + modName.slice(1)}.js`}
]

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);

    this.argument('modName', { type: String, required: true, description: "Module Name" }); // CLI argument -> available in this.options['modName']
  }

  async prompting() {
    this.log(yosay(`Let's create a new module!`)); // Let Yeoman avatar speak
    this.answers = await this.prompt(prompts);
  }

  writing() {
    // CI Settings
    const { modName } = this.options; // get application name
    const cptModName = modName.charAt(0).toUpperCase() + modName.slice(1); // capitilaize mod name
    const { includes: includesAnswers } = this.answers; // get answers
    const files = filesArray(modName);
    const includeVar = {};

    includesArray.forEach( item => {
      if(includesAnswers.includes(item)){
        files.push({
          src: `module/_${item}.js`,
          out: `src/modules/${modName}/${item}.js`,
          include: `${item}`
        });
        if(item !== 'utility'){
          files.push({
          src: `module/_tests/_${item}.testPartial.js`,
          out: `src/modules/${modName}/__tests__/${item}.testPartial.js`
        });
        }

      }
    });

    includesArray.forEach( item => {
      includeVar[item] = includesAnswers.includes(item);
    });

    files.forEach( file => {
      return this.fs.copyTpl(
        this.templatePath(file.src),
        this.destinationPath(file.out),
        {
          modName,
          cptModName,
          ...(this.answers.fetchSelectors && {fetchSelectors: this.answers.fetchSelectors}),
          ...includeVar
        }
      )
    })
  }

  // Install Dependencies
  // install() {
  //   this.installDependencies();
  // }
};
