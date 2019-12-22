// External
import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean, radios } from '@storybook/addon-knobs';

// Local
import IconButton from '../IconButton';
import buttonIconInst from './notes/iconButton_install.md';

// Constants
const iconButtonStories = storiesOf('Icon Button', module).addDecorator(
  withKnobs,
);
const sizeOpts = {
  small: 'small',
  medium: 'medium',
};

iconButtonStories.add(
  'Default',
  () => (
    <>
      <IconButton
        size={radios('Display size: ', sizeOpts, 'small')}
        disabled={boolean('Is Disabled: ', false)}
        ripple={boolean('Has ripple: ', true)}
        primary={boolean('Is primary: ', true)}
      >
        <i className="fas fa-map" />
      </IconButton>
    </>
  ),
  {
    notes: { install: buttonIconInst },
  },
);
