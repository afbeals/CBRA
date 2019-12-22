// External
import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text, boolean } from '@storybook/addon-knobs';

// Local
import TextField from '../TextField';
import textFieldInst from './notes/textfield_install.md';

// Constants
const textFieldStories = storiesOf('TextField', module).addDecorator(withKnobs);

textFieldStories.add(
  'Default',
  () => (
    <>
      <TextField
        label={text('Label: ', 'Username')}
        hasError={boolean('Has Error: ', false)}
      />
    </>
  ),
  {
    notes: { install: textFieldInst },
  },
);
