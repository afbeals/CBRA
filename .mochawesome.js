// Create fake DOM for testing
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

const dom = new JSDOM('<!doctype html><html><body></body></html>',{
    url: "http://localhost"
});
const { window } = dom;

global.window = window;
global.document = window.document;
global.localStorage = window.localStorage;
global.navigator = { userAgent: 'node.js' };
global.self = global.window;
global.window.isUnitTesting = true; // let localStorage or window type testing to be ignored
global.FormData = class FormDataMock {
  constructor(height, width) {
     this.append = () => {};
   }
 }
