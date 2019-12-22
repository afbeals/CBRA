// External
import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text, boolean, radios } from '@storybook/addon-knobs';

// Local
import Loading from '../Loading';
import loadingInst from './notes/loading_install.md';

// constants
const loadingStories = storiesOf('Loading', module).addDecorator(withKnobs);
const sizeOpts = {
  small: 'small',
  medium: 'medium',
  large: 'large',
};

loadingStories.add(
  'Base View',
  () => (
    <Loading
      text={text('Additional Text: ', '')}
      dark={boolean('Dark background', false)}
      size={radios('Display size: ', sizeOpts, 'medium')}
    />
  ),
  {
    notes: { install: loadingInst },
  },
);
