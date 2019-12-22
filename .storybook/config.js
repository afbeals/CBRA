import { configure, addDecorator, addParameters } from '@storybook/react';
import { withViewport, INITIAL_VIEWPORTS } from '@storybook/addon-viewport'; // Add tab to allow adjustings viewport size
import { withBackgrounds } from '@storybook/addon-backgrounds'; // Add tab to change viewport background color
import { withConsole } from "@storybook/addon-console"; // Pull console warnings & errors into tab
import { withNotes } from '@storybook/addon-notes'; // All notes addition to stories
import { withA11y } from '@storybook/addon-a11y';
import { themes } from '@storybook/theming';
import centered from '@storybook/addon-centered/react'; // Center all components

// Resources
import '~Styles/main';
import 'typeface-roboto';
import '@fortawesome/fontawesome-free/css/all';

// Global addons
addParameters({
  viewport: {
    viewports: INITIAL_VIEWPORTS,
  }, //array of selecablt backgrounds for background tab
  backgrounds: [
    { name: 'light {App default}', value: 'rgba(241, 241, 241, 1)', default: true },
    { name: 'dark', value: 'rgba(70, 71, 74, 1)' },
    { name: 'twitter', value: '#00aced' },
    { name: 'facebook', value: '#3b5998' },
  ],
  a11y: { element: '#root' },
  options: {
    theme: themes.dark,
  }
});
addDecorator(centered);
addDecorator(withA11y);
addDecorator((storyFn, context) => withConsole()(storyFn)(context)); // log console warnings and errors to Action logger

const req = require.context('../src/', true, /__stories__\/.*stories.(js|jsx)$/); // Look for '.stories' in __stories__ folders in src

function loadStories() {
  require('../src/components/__stories__/welcome'); // Load welcom page first
  req.keys().forEach(filename => req(filename)); // get all stories from context
}

configure(loadStories, module);
