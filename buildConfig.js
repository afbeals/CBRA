const appPackage = require('./package.json');

const { name } = appPackage;

module.exports = {
  htmlTemplate: {
    title: 'Create Base React App',
  },
  appName: name,
};
