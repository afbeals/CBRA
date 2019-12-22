// External
import React from 'react';
import { storiesOf } from '@storybook/react';

// Constants
const wrapperStyle = {
  textAlign: 'center',
};

// Create welcom page
storiesOf('Welcome', module).add('Storybook', () => (
  <div style={wrapperStyle}>
    <h3>Welcome to the CBRA component library</h3>
  </div>
));
