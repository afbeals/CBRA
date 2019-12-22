const appPackage = require('./package.json');

const { name } = appPackage;

module.exports = {
  name,
  verbose: true,
  testMatch: ['**/*.testJest.js?(x)'],
  testPathIgnorePatterns: ['/node_modules/', '/scripts/'],
  reporters: ['default', 'jest-stare'],
  testURL: 'http://localhost',
  moduleNameMapper: {
    '\\.(css|scss|less)$': '<rootDir>/.jestMocks/styleMock.js', // mock style imports in file
    '\\.(png|jpg|gif|ttf|eot|svg)$': '<rootDir>/.jestMocks/fileMock.js', // mock image imports in file
  },
  coverageDirectory: './testReports/jest/coverage',
  coverageReporters: ['html', 'json', 'text-summary'],
  collectCoverage: true,
  collectCoverageFrom: [
    '**/*.jsx',
    '!**/__stories__/*',
    '!./*',
    '!**/node_modules/**',
  ],
};
